import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AiService } from './ai.service';
import { ComparisonService } from '../comparison/comparison.service';
import { ResultsService } from '../results/results.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly comparisonService: ComparisonService,
    private readonly resultsService: ResultsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('predict-qualy')
  async predictQualy(
    @Body('sessionKey') sessionKeyStr: string | number,
    @Res() res: Response,
  ) {
    const sessionKey = Number(sessionKeyStr);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      // 1. Get session info
      const session = await this.prisma.session.findUnique({
        where: { sessionKey },
      });

      if (!session) {
        throw new Error('Session metadata not found in database');
      }

      // 2. Get results for the practice session
      const results = await this.resultsService.getResults(sessionKey);

      // 3. Start prediction stream
      const stream = await this.aiService.predictQualifyingStream(
        results,
        session,
      );

      for await (const chunk of stream) {
        if (
          !chunk.choices ||
          chunk.choices.length === 0 ||
          !chunk.choices[0].delta
        ) {
          continue;
        }

        const delta = chunk.choices[0].delta;
        const content = delta.content || '';
        const reasoning = (delta as any).reasoning_content || '';

        if (reasoning) {
          const formattedReasoning = `<span style="color: #666; font-style: italic;">${reasoning}</span>`;
          res.write(
            `data: ${JSON.stringify({ content: formattedReasoning })}\n\n`,
          );
        }

        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('AI Prediction Error:', error);
      res.write(
        `data: ${JSON.stringify({
          error: error.message || 'AI Prediction failed',
        })}\n\n`,
      );
      res.end();
    }
  }

  @Post('analyze')
  async analyzeComparison(
    @Body('sessionKey') sessionKeyStr: string | number,
    @Body('driver1') driver1Str: string | number,
    @Body('driver2') driver2Str: string | number,
    @Res() res: Response,
  ) {
    const sessionKey = Number(sessionKeyStr);
    const d1 = Number(driver1Str);
    const d2 = Number(driver2Str);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      const cacheKey = `ai_analysis_${sessionKey}_${d1}_${d2}`;

      const cached = await this.aiService.getCachedAnalysis(cacheKey);
      if (cached) {
        res.write(`data: ${JSON.stringify({ content: cached })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      // Fetch telemetry data internally to save network payload
      const compData = await this.comparisonService.compareDrivers(
        sessionKey,
        d1,
        d2,
      );
      if (!compData) {
        throw new Error('Comparison data not found');
      }

      const stream = await this.aiService.analyzeComparisonStream(
        sessionKey,
        compData.drivers.driver1,
        compData.drivers.driver2,
        compData.data,
        compData.sectorAnalysis,
      );

      let fullResponse = '';
      for await (const chunk of stream) {
        if (
          !chunk.choices ||
          chunk.choices.length === 0 ||
          !chunk.choices[0].delta
        ) {
          continue;
        }

        const delta = chunk.choices[0].delta;
        const content = delta.content || '';
        const reasoning = (delta as any).reasoning_content || '';

        if (reasoning) {
          // Format reasoning in a distinct way (e.g. gray or italic) so frontend can render it nicely if it wants,
          // or we just send it as content with an HTML span
          const formattedReasoning = `<span style="color: #666; font-style: italic;">${reasoning}</span>`;
          fullResponse += formattedReasoning;
          res.write(
            `data: ${JSON.stringify({ content: formattedReasoning })}\n\n`,
          );
        }

        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      if (fullResponse) {
        await this.aiService.setCachedAnalysis(cacheKey, fullResponse);
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('AI Analysis Error:', error);
      res.write(
        `data: ${JSON.stringify({ error: error.message || 'AI Analysis failed' })}\n\n`,
      );
      res.end();
    }
  }

  @Post('chat')
  async chatWithAgent(
    @Body('agentType') agentType: any,
    @Body('messages')
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    @Body('isSimpleMode') isSimpleMode: boolean,
    @Body('context') context: any,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      const userMessage = messages[messages.length - 1];
      const sessionKey = context?.sessionKey
        ? Number(context.sessionKey)
        : undefined;

      // 1. Save user message immediately
      await this.aiService.saveChatMessage({
        role: 'user',
        content: userMessage.content,
        agentType,
        sessionKey,
      });

      const stream = await this.aiService.chatWithAgentStream(
        agentType,
        messages || [],
        isSimpleMode || false,
        context,
      );

      let fullContent = '';
      let fullReasoning = '';

      for await (const chunk of stream) {
        if (
          !chunk.choices ||
          chunk.choices.length === 0 ||
          !chunk.choices[0].delta
        ) {
          continue;
        }

        const delta = chunk.choices[0].delta;
        const content = delta.content || '';
        const reasoning = (delta as any).reasoning_content || '';

        if (reasoning) {
          fullReasoning += reasoning;
          const formattedReasoning = `<span style="color: #666; font-style: italic;">${reasoning}</span>`;
          res.write(
            `data: ${JSON.stringify({ content: formattedReasoning })}\n\n`,
          );
        }

        if (content) {
          fullContent += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // 2. Save assistant message after stream ends
      if (fullContent) {
        await this.aiService.saveChatMessage({
          role: 'assistant',
          content: fullContent,
          reasoning: fullReasoning || undefined,
          agentType,
          sessionKey,
        });
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      res.write(
        `data: ${JSON.stringify({ error: error.message || 'AI Chat failed' })}\n\n`,
      );
      res.end();
    }
  }

  @Post('history')
  async getHistory(
    @Body('agentType') agentType: string,
    @Body('sessionKey') sessionKey: string | number,
  ) {
    const sKey = sessionKey ? Number(sessionKey) : undefined;
    const history = await this.aiService.getChatHistory(agentType, sKey);
    return history.map((m) => ({
      role: m.role,
      content: m.content,
      reasoning: m.reasoning,
    }));
  }
}
