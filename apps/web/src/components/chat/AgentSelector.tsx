'use client';

import { Thermometer, Activity, Zap, Cpu, Navigation, Wind, Map, User } from 'lucide-react';
import { AgentType } from 'shared-types';

interface AgentDef {
  id: AgentType;
  name: string;
  role: string;
  icon: any;
  color: string;
}

export const AGENTS: AgentDef[] = [
  { id: 'general', name: 'Oracle', role: 'F1 Expert', icon: User, color: 'text-white' },
  { id: 'tire', name: 'Mario', role: 'Tire Engineer', icon: Thermometer, color: 'text-red-500' },
  { id: 'race', name: 'Bono', role: 'Race Engineer', icon: Activity, color: 'text-blue-500' },
  {
    id: 'performance',
    name: 'Riccardo',
    role: 'Performance Eng.',
    icon: Zap,
    color: 'text-yellow-500',
  },
  { id: 'telemetry', name: 'Aya', role: 'Telemetry Eng.', icon: Cpu, color: 'text-green-500' },
  {
    id: 'strategy',
    name: 'Hannah',
    role: 'Strategy Analyst',
    icon: Navigation,
    color: 'text-purple-500',
  },
  { id: 'aero', name: 'Adrian', role: 'Aerodynamicist', icon: Wind, color: 'text-cyan-500' },
  { id: 'track', name: 'Gianpiero', role: 'Trackside Eng.', icon: Map, color: 'text-orange-500' },
];

export function AgentSelector({
  selectedAgent,
  onSelect,
}: {
  selectedAgent: AgentType;
  onSelect: (agent: AgentType) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
      {AGENTS.map(agent => {
        const isSelected = selectedAgent === agent.id;
        const Icon = agent.icon;

        return (
          <button
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-2xl min-w-[80px] transition-all duration-300 border
              ${
                isSelected
                  ? 'bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'bg-black/40 border-white/5 hover:bg-white/5'
              }
            `}
          >
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
              ${isSelected ? 'bg-black/50' : 'bg-black/20'}
            `}
            >
              <Icon size={18} className={agent.color} />
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-white/50'}`}
            >
              {agent.name}
            </span>
            <span className="text-[8px] font-medium text-white/30 uppercase tracking-widest mt-0.5 whitespace-nowrap">
              {agent.role}
            </span>
          </button>
        );
      })}
    </div>
  );
}
