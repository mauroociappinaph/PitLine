import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import Redis from 'ioredis';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private redis: Redis | null = null;
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
    const apiKey =
      this.configService.get<string>('OPENAI_API_KEY') ||
      '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';
    const originalBaseUrl = this.configService.get<string>('OPENAI_BASE_URL');

    let baseURL = originalBaseUrl;
    if (!baseURL && apiKey.startsWith('nvapi-')) {
      baseURL = 'https://integrate.api.nvidia.com/v1';
    }

    this.logger.log(
      `Initializing AI Service with Base URL: ${baseURL || 'default (OpenAI)'}`,
    );

    this.openai = new OpenAI({
      apiKey,
      baseURL,
    });

    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (redisUrl) {
      try {
        this.redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
        this.redis.on('error', (e) =>
          this.logger.warn(`Redis error: ${e.message}`),
        );
      } catch (e) {
        this.logger.warn('Failed to initialize Redis client.');
      }
    } else {
      this.logger.warn('REDIS_URL not provided, caching will be disabled.');
    }
  }

  async getCachedAnalysis(cacheKey: string): Promise<string | null> {
    if (!this.redis) return null;
    try {
      return await this.redis.get(cacheKey);
    } catch {
      return null;
    }
  }

  async setCachedAnalysis(cacheKey: string, content: string): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.setex(cacheKey, 86400, content); // 24 hours
    } catch {
      // Ignore cache write errors
    }
  }

  async analyzeComparison(
    sessionKey: number,
    driver1: any,
    driver2: any,
    comparisonData: any[],
    sectorAnalysis: any,
  ): Promise<string> {
    const prompt = this.buildPrompt(
      sessionKey,
      driver1,
      driver2,
      comparisonData,
      sectorAnalysis,
    );

    try {
      const response = await this.openai.chat.completions.create({
        model: 'z-ai/glm5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        top_p: 1,
        max_tokens: 16384,
        extra_body: {
          chat_template_kwargs: {
            enable_thinking: true,
            clear_thinking: false,
          },
        },
      } as any);

      const content = response.choices[0]?.message?.content || '';
      const reasoning =
        (response.choices[0]?.message as any)?.reasoning_content || '';
      return reasoning ? `${reasoning}\n\n${content}` : content;
    } catch (error) {
      this.logger.error('Failed to get AI completion', error);
      throw error;
    }
  }

  async analyzeComparisonStream(
    sessionKey: number,
    driver1: any,
    driver2: any,
    comparisonData: any[],
    sectorAnalysis: any,
  ) {
    const prompt = this.buildPrompt(
      sessionKey,
      driver1,
      driver2,
      comparisonData,
      sectorAnalysis,
    );

    try {
      const stream = (await this.openai.chat.completions.create({
        model: 'z-ai/glm5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        top_p: 1,
        max_tokens: 16384,
        stream: true,
        extra_body: {
          chat_template_kwargs: {
            enable_thinking: true,
            clear_thinking: false,
          },
        },
      } as any)) as unknown as import('openai/streaming').Stream<
        import('openai/resources/chat/completions').ChatCompletionChunk
      >;

      return stream;
    } catch (error) {
      this.logger.error('Failed to get AI completion stream', error);
      throw error;
    }
  }

  private buildPrompt(
    sessionKey: number,
    driver1: any,
    driver2: any,
    comparisonData: any[],
    sectorAnalysis: any,
  ): string {
    return `
Eres el "Performance Engineer", un ingeniero de pista de Fórmula 1 experto en telemetría.
Se te ha encomendado analizar la comparación entre ${driver1?.lastName} y ${driver2?.lastName} para la sesión ${sessionKey}.

### Datos de Telemetría (Resumen):
- Sector 1 Dominado por: Piloto ${sectorAnalysis?.s1 === 1 ? driver1?.lastName : driver2?.lastName}
- Sector 2 Dominado por: Piloto ${sectorAnalysis?.s2 === 1 ? driver1?.lastName : driver2?.lastName}
- Sector 3 Dominado por: Piloto ${sectorAnalysis?.s3 === 1 ? driver1?.lastName : driver2?.lastName}

### Muestra de vueltas (primeras 3):
${JSON.stringify(comparisonData.slice(0, 3), null, 2)}

Basado EXCLUSIVAMENTE en estos datos (no inventes), actúa como un ingeniero de pista escribiendo por radio al piloto o explicándole a un comentarista:
1. Habla en español nativo, usando términos técnicos pero fáciles de entender (ej. "velocidad punta", "tracción", "carga aerodinámica").
2. Sé muy directo y breve (máximo 4 oraciones). No saludes ni des introducciones.
3. Menciona qué zonas del circuito le favorecen a cada uno.
4. Usa un tono analítico, frío y objetivo, acorde al estándar "Dark Glassmorphism 2026" de la aplicación PitLine.
`;
  }
}
