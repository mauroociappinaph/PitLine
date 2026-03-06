'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Send, X, MessageSquare, ChevronDown, Check } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AgentSelector, AGENTS } from './AgentSelector';
import { AgentType } from 'shared-types';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoning?: string;
}

function ChatInterfaceInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('race');
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Pit wall online. ¿En qué te ayudo jefe?',
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeAgentDef = AGENTS.find(a => a.id === selectedAgent);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg = input.trim();
    setInput('');

    // Optimistic UI update
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsStreaming(true);

    // Build context payload
    const activeContext = {
      pathname,
      sessionKey: searchParams.get('sessionKey'),
      driver1: searchParams.get('driver1'),
      driver2: searchParams.get('driver2'),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: selectedAgent,
          messages: messages
            .map(m => ({ role: m.role, content: m.content }))
            .concat({ role: 'user', content: userMsg }),
          isSimpleMode,
          context: activeContext,
        }),
      });

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              setIsStreaming(false);
              return;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.content) {
                setMessages(prev => {
                  const newMsgs = [...prev];
                  const lastMsg = newMsgs[newMsgs.length - 1];

                  // Check if content is HTML reasoning
                  if (parsed.content.startsWith('<span style="color: #666;')) {
                    // Extract the inner text for cleaner storage if wanted, or just append HTML
                    lastMsg.reasoning = (lastMsg.reasoning || '') + parsed.content;
                  } else {
                    lastMsg.content += parsed.content;
                  }

                  return newMsgs;
                });
              }
            } catch (e) {
              // ignore parse errors for chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Connection to pit wall lost. Please try again.' },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform z-50 group"
        >
          <MessageSquare size={24} className="group-hover:animate-pulse" />
        </button>
      )}

      {/* Chat Drawer */}
      <div
        className={`
          fixed top-0 right-0 w-full md:w-[480px] h-full bg-[#050505] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <header className="p-6 border-b border-white/5 flex flex-col gap-6 relative overflow-hidden bg-black/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />

          <div className="flex justify-between items-center z-10 relative">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
                NVIDIA GLM-5 Multi-Agent
              </span>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">
                Comms Channel
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
            >
              <X size={18} className="text-white/70" />
            </button>
          </div>

          <div className="z-10 relative flex flex-col gap-3">
            <AgentSelector selectedAgent={selectedAgent} onSelect={setSelectedAgent} />

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
              <span className="text-[10px] uppercase font-black tracking-widest text-white/50">
                Explicación Simple
              </span>
              <button
                onClick={() => setIsSimpleMode(!isSimpleMode)}
                className={`w-10 h-6 rounded-full p-1 transition-colors flex ${isSimpleMode ? 'bg-primary' : 'bg-white/10'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${isSimpleMode ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
            >
              <div
                className={`
                  p-4 rounded-2xl text-sm font-medium tracking-wide leading-relaxed
                  ${
                    msg.role === 'user'
                      ? 'bg-white text-black rounded-tr-sm'
                      : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-sm'
                  }
                `}
              >
                {msg.role === 'assistant' && activeAgentDef && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                    <activeAgentDef.icon size={12} className={activeAgentDef.color} />
                    <span
                      className={`text-[9px] uppercase font-black tracking-widest ${activeAgentDef.color} opacity-80`}
                    >
                      {activeAgentDef.name}
                    </span>
                  </div>
                )}

                {msg.reasoning && (
                  <div
                    className="text-[11px] mb-3 pb-3 border-b border-white/5 opacity-70"
                    dangerouslySetInnerHTML={{ __html: msg.reasoning.replace(/\\n/g, '<br/>') }}
                  />
                )}

                <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />

                {msg.role === 'assistant' && isStreaming && idx === messages.length - 1 && (
                  <span className="inline-block w-1.5 h-3 ml-1 bg-white/50 animate-pulse align-middle" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-6 bg-black/50 border-t border-white/5">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-3">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Radio to ${activeAgentDef?.name || 'Pit Wall'}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none min-h-[60px] max-h-[150px] font-medium tracking-wide text-sm scrollbar-none"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center disabled:opacity-20 disabled:scale-95 transition-all hover:scale-105"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export function ChatInterface() {
  return (
    <Suspense fallback={null}>
      <ChatInterfaceInner />
    </Suspense>
  );
}
