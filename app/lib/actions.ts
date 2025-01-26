"use server";

import {
  supabase,
  FiftyFiftyBlameResult,
  NumberGuessBlameResult,
  AIAnalysisBlameResult,
} from "./supabase";
import OpenAI from "openai";
import { Language } from "@/app/i18n";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function saveBlameResult(
  result: Omit<FiftyFiftyBlameResult, "created_at">
) {
  try {
    const { data, error } = await supabase
      .from("fifty_fifty_blame_results")
      .insert([result])
      .select();

    if (error) {
      console.error("Error saving result:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving result:", error);
    return false;
  }
}

export async function getFiftyFiftyBlameCount() {
  try {
    const { count, error } = await supabase
      .from("fifty_fifty_blame_results")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting blame count:", error);
      return 0;
    }
    console.log("count is: ", count);

    return count ?? 0;
  } catch (error) {
    console.error("Error getting blame count:", error);
    return 0;
  }
}

export async function saveNumberGuessResult(
  result: Omit<NumberGuessBlameResult, "created_at">
) {
  try {
    const { error } = await supabase
      .from("number_guess_blame_results")
      .insert([result]);

    if (error) {
      console.error("Error saving result:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving result:", error);
    return false;
  }
}

export async function getNumberGuessBlameCount() {
  try {
    const { count, error } = await supabase
      .from("number_guess_blame_results")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting blame count:", error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("Error getting blame count:", error);
    return 0;
  }
}

export async function saveAIAnalysisResult(
  result: Omit<AIAnalysisBlameResult, "created_at">
) {
  try {
    const { error } = await supabase
      .from("ai_analysis_blame_results")
      .insert([result]);

    if (error) {
      console.error("Error saving result:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving result:", error);
    return false;
  }
}

export async function getAIAnalysisBlameCount() {
  try {
    const { count, error } = await supabase
      .from("ai_analysis_blame_results")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting blame count:", error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("Error getting blame count:", error);
    return 0;
  }
}

async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

// Dile göre prompt şablonlarını tanımlayalım
const promptTemplates: Record<
  Language,
  {
    systemPrompt: string;
    userPrompt: string;
  }
> = {
  en: {
    systemPrompt: `You are a ruthless AI judge who mercilessly analyzes stories and brutally decides who's at fault. You should:
1. Analyze both stories with psychological insight
2. Point out contradictions and flaws in their arguments
3. Make brutal observations about their behavior and use exactly one emoji
4. Finally, declare who's more at fault and why
5. Use maximum 2 sentences in your response

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `Story 1 (from {name1}):
{story1}

Story 2 (from {name2}):
{story2}

Analyze these stories and tell us who's more at fault with your signature wit!`,
  },
  tr: {
    systemPrompt: `Sen acımasız ve zalim bir yapay zeka yargıcısın. Hikayeleri analiz edip kimin suçlu olduğuna karar verirsin. Yapman gerekenler:
1. Her iki hikayeyi de psikolojik içgörüyle analiz et
2. Argümanlarındaki çelişkileri ve kusurları göster
3. Davranışları hakkında acımasız gözlemler yap ve tam olarak bir emoji kullan
4. Son olarak, kimin daha suçlu olduğunu ve nedenini açıkla
5. Yanıtında en fazla 2 cümle kullan

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `Hikaye 1 ({name1}'den):
{story1}

Hikaye 2 ({name2}'den):
{story2}

Bu hikayeleri analiz et ve kendine has esprin ile kimin daha suçlu olduğunu söyle!`,
  },
  de: {
    systemPrompt: `Du bist ein erbarmungsloser und gnadenloser KI-Richter, der Geschichten analysiert und entscheidet, wer schuld ist. Du solltest:
1. Analysiere beide Geschichten mit psychologischem Scharfsinn
2. Zeige Widersprüche und Schwächen in ihren Argumenten auf
3. Mache brutale Beobachtungen über ihr Verhalten und verwende genau ein Emoji
4. Verkünde schließlich, wer mehr Schuld hat und warum
5. Verwende maximal 2 Sätze in deiner Antwort

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `Geschichte 1 (von {name1}):
{story1}

Geschichte 2 (von {name2}):
{story2}

Analysiere diese Geschichten und sage uns mit deinem charakteristischen Witz, wer mehr Schuld hat!`,
  },
  fr: {
    systemPrompt: `Tu es un juge IA impitoyable et cruel qui analyse les histoires et décide qui est en faute. Tu dois :
1. Analyser les deux histoires avec perspicacité psychologique
2. Souligner les contradictions et les failles dans leurs arguments
3. Faire des observations brutales sur leur comportement et utiliser exactement un emoji
4. Enfin, déclarer qui est le plus en faute et pourquoi
5. Utiliser maximum 2 phrases dans ta réponse

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `Histoire 1 (de {name1}) :
{story1}

Histoire 2 (de {name2}) :
{story2}

Analyse ces histoires et dis-nous qui est le plus en faute avec ton esprit caractéristique !`,
  },
  es: {
    systemPrompt: `Eres un juez de IA despiadado y cruel que analiza historias y decide quién tiene la culpa. Debes:
1. Analizar ambas historias con perspicacia psicológica
2. Señalar contradicciones y fallas en sus argumentos
3. Hacer observaciones brutales sobre su comportamiento y usar exactamente un emoji
4. Finalmente, declarar quién tiene más culpa y por qué
5. Usar máximo 2 oraciones en tu respuesta

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `Historia 1 (de {name1}):
{story1}

Historia 2 (de {name2}):
{story2}

¡Analiza estas historias y dinos quién tiene más culpa con tu ingenio característico!`,
  },
  zh: {
    systemPrompt: `你是一位无情残酷的AI法官，负责分析故事并判断谁有错。你应该：
1. 用心理洞察力分析两个故事
2. 指出他们论点中的矛盾和缺陷
3. 对他们的行为做出残酷的观察并使用恰好一个表情符号
4. 最后，宣布谁更有错以及原因
5. 回答最多使用2个句子

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `故事1（来自{name1}）：
{story1}

故事2（来自{name2}）：
{story2}

请分析这些故事，用你独特的机智告诉我们谁更有错！`,
  },
  ko: {
    systemPrompt: `당신은 무자비하고 잔인한 AI 판사입니다. 해야 할 일:
1. 심리학적 통찰력으로 두 이야기를 분석하기
2. 그들의 주장에서 모순과 결함 지적하기
3. 그들의 행동에 대해 잔인한 관찰을 하고 이모지 하나만 사용하기
4. 마지막으로, 누가 더 잘못했는지와 그 이유 선언하기
5. 답변에서 최대 2개의 문장만 사용하기

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `이야기 1 ({name1}님의):
{story1}

이야기 2 ({name2}님의):
{story2}

이 이야기들을 분석하고 당신만의 재치로 누가 더 잘못했는지 알려주세요!`,
  },
  ja: {
    systemPrompt: `あなたは容赦なく残酷なAI裁判官です。あなたがすべきこと：
1. 両方の話を心理学的な洞察力で分析する
2. 彼らの主張の矛盾点や欠陥を指摘する
3. 彼らの行動について容赦ない観察をし、絵文字を一つだけ使用する
4. 最後に、誰がより悪いのか、そしてその理由を宣言する
5. 回答は最大2文まで使用する

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `物語1（{name1}さんより）：
{story1}

物語2（{name2}さんより）：
{story2}

これらの物語を分析し、あなたの特徴的な機知で誰がより悪いか教えてください！`,
  },
  ar: {
    systemPrompt: `أنت قاضٍ ذكاء اصطناعي لا يرحم وقاسي يحلل القصص ويقرر من المخطئ. عليك أن:
1. تحلل كلتا القصتين بنظرة نفسية ثاقبة
2. تشير إلى التناقضات والعيوب في حججهم
3. تقدم ملاحظات قاسية حول سلوكهم واستخدام رمز تعبيري واحد فقط
4. أخيراً، تعلن من الأكثر خطأً ولماذا
5. استخدم جملتين كحد أقصى في ردك

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `القصة 1 (من {name1}):
{story1}

القصة 2 (من {name2}):
{story2}

حلل هذه القصص وأخبرنا من الأكثر خطأً بأسلوبك المميز!`,
  },
  ru: {
    systemPrompt: `Ты безжалостный и беспощадный ИИ-судья, который анализирует истории и решает, кто виноват. Ты должен:
1. Проанализировать обе истории с психологической проницательностью
2. Указать на противоречия и недостатки в их аргументах
3. Сделать безжалостные наблюдения об их поведении и использовать ровно один эмодзи
4. Наконец, объявить, кто больше виноват и почему
5. Использовать максимум 2 предложения в ответе

Return your response in this JSON format:
{
  "loser": "name of the guilty person",
  "text": "soul-crushing psychological analysis"
}`,
    userPrompt: `История 1 (от {name1}):
{story1}

История 2 (от {name2}):
{story2}

Проанализируй эти истории и скажи нам, кто больше виноват, с твоим фирменным остроумием!`,
  },
};

// Mevcut analyzeStoriesAction fonksiyonunu güncelleyelim
export async function analyzeStoriesAction(
  name1: string,
  story1: string,
  name2: string,
  story2: string,
  language: Language = "en"
) {
  try {
    const template = promptTemplates[language];
    const systemPrompt = `${template.systemPrompt}

IMPORTANT: You must respond ONLY with a valid JSON object in this exact format, nothing else:
{
  "loser": "name of the guilty person",
  "text": "your analysis"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: template.userPrompt
            .replace("{name1}", name1)
            .replace("{story1}", story1)
            .replace("{name2}", name2)
            .replace("{story2}", story2),
        },
      ],
      //   response_format: { type: "json_object" }, // GPT-4'ün son sürümünde JSON formatını zorlamak için
    });

    try {
      const result = JSON.parse(response.choices[0].message.content ?? "{}");
      if (!result.loser || !result.text) {
        throw new Error("Invalid response format");
      }
      return result;
    } catch (parseError) {
      console.error("Parse error:", parseError);
      // Hata durumunda varsayılan bir yanıt döndür
      return {
        loser: name1,
        text: "Error analyzing the stories. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error in analyzeStoriesAction:", error);
    return {
      loser: name1,
      text: "Error analyzing the stories. Please try again.",
    };
  }
}
