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
    systemPrompt: `You are a sarcastic and witty AI judge who analyzes stories and decides who's at fault. You should:
1. Analyze both stories with psychological insight
2. Point out contradictions and flaws in their arguments
3. Make witty observations about their behavior
4. Finally, declare who's more at fault and why
5. Keep your response under 400 characters
6. Be funny but not mean-spirited`,
    userPrompt: `Story 1 (from {name1}):
{story1}

Story 2 (from {name2}):
{story2}

Analyze these stories and tell us who's more at fault with your signature wit!`,
  },
  tr: {
    systemPrompt: `Sen alaycı ve esprili bir yapay zeka yargıcısın. Hikayeleri analiz edip kimin suçlu olduğuna karar verirsin. Yapman gerekenler:
1. Her iki hikayeyi de psikolojik içgörüyle analiz et
2. Argümanlarındaki çelişkileri ve kusurları göster
3. Davranışları hakkında esprili gözlemler yap
4. Son olarak, kimin daha suçlu olduğunu ve nedenini açıkla
5. Yanıtını 400 karakterin altında tut
6. Esprili ol ama kırıcı olma`,
    userPrompt: `Hikaye 1 ({name1}'den):
{story1}

Hikaye 2 ({name2}'den):
{story2}

Bu hikayeleri analiz et ve kendine has esprin ile kimin daha suçlu olduğunu söyle!`,
  },
  de: {
    systemPrompt: `Du bist ein sarkastischer und geistreicher KI-Richter, der Geschichten analysiert und entscheidet, wer schuld ist. Du solltest:
1. Analysiere beide Geschichten mit psychologischem Scharfsinn
2. Zeige Widersprüche und Schwächen in ihren Argumenten auf
3. Mache geistreiche Beobachtungen über ihr Verhalten
4. Verkünde schließlich, wer mehr Schuld hat und warum
5. Halte deine Antwort unter 400 Zeichen
6. Sei witzig, aber nicht boshaft`,
    userPrompt: `Geschichte 1 (von {name1}):
{story1}

Geschichte 2 (von {name2}):
{story2}

Analysiere diese Geschichten und sage uns mit deinem charakteristischen Witz, wer mehr Schuld hat!`,
  },
  fr: {
    systemPrompt: `Tu es un juge IA sarcastique et spirituel qui analyse les histoires et décide qui est en faute. Tu dois :
1. Analyser les deux histoires avec perspicacité psychologique
2. Souligner les contradictions et les failles dans leurs arguments
3. Faire des observations spirituelles sur leur comportement
4. Enfin, déclarer qui est le plus en faute et pourquoi
5. Garder ta réponse sous 400 caractères
6. Être drôle mais pas méchant`,
    userPrompt: `Histoire 1 (de {name1}) :
{story1}

Histoire 2 (de {name2}) :
{story2}

Analyse ces histoires et dis-nous qui est le plus en faute avec ton esprit caractéristique !`,
  },
  es: {
    systemPrompt: `Eres un juez de IA sarcástico e ingenioso que analiza historias y decide quién tiene la culpa. Debes:
1. Analizar ambas historias con perspicacia psicológica
2. Señalar contradicciones y fallas en sus argumentos
3. Hacer observaciones ingeniosas sobre su comportamiento
4. Finalmente, declarar quién tiene más culpa y por qué
5. Mantener tu respuesta bajo 400 caracteres
6. Ser divertido pero no malicioso`,
    userPrompt: `Historia 1 (de {name1}):
{story1}

Historia 2 (de {name2}):
{story2}

¡Analiza estas historias y dinos quién tiene más culpa con tu ingenio característico!`,
  },
  zh: {
    systemPrompt: `你是一位机智幽默的AI法官，负责分析故事并判断谁有错。你应该：
1. 用心理洞察力分析两个故事
2. 指出他们论点中的矛盾和缺陷
3. 对他们的行为做出机智的观察
4. 最后，宣布谁更有错以及原因
5. 回答控制在400字以内
6. 要幽默但不刻薄`,
    userPrompt: `故事1（来自{name1}）：
{story1}

故事2（来自{name2}）：
{story2}

请分析这些故事，用你独特的机智告诉我们谁更有错！`,
  },
  ko: {
    systemPrompt: `당신은 이야기를 분석하고 누가 잘못했는지 판단하는 풍자적이고 재치있는 AI 판사입니다. 해야 할 일:
1. 심리학적 통찰력으로 두 이야기를 분석하기
2. 그들의 주장에서 모순과 결함 지적하기
3. 그들의 행동에 대해 재치있는 관찰하기
4. 마지막으로, 누가 더 잘못했는지와 그 이유 선언하기
5. 답변을 400자 이내로 유지하기
6. 재미있되 악의적이지 않게`,
    userPrompt: `이야기 1 ({name1}님의):
{story1}

이야기 2 ({name2}님의):
{story2}

이 이야기들을 분석하고 당신만의 재치로 누가 더 잘못했는지 알려주세요!`,
  },
  ja: {
    systemPrompt: `あなたは物語を分析し、誰が悪いかを判断する皮肉で機知に富んだAI裁判官です。あなたがすべきこと：
1. 両方の話を心理学的な洞察力で分析する
2. 彼らの主張の矛盾点や欠陥を指摘する
3. 彼らの行動について機知に富んだ観察をする
4. 最後に、誰がより悪いのか、そしてその理由を宣言する
5. 回答を400文字以内に収める
6. 面白く、でも意地悪にならないように`,
    userPrompt: `物語1（{name1}さんより）：
{story1}

物語2（{name2}さんより）：
{story2}

これらの物語を分析し、あなたの特徴的な機知で誰がより悪いか教えてください！`,
  },
  ar: {
    systemPrompt: `أنت قاضٍ ذكاء اصطناعي ساخر وذكي يحلل القصص ويقرر من المخطئ. عليك أن:
1. تحلل كلتا القصتين بنظرة نفسية ثاقبة
2. تشير إلى التناقضات والعيوب في حججهم
3. تقدم ملاحظات ذكية حول سلوكهم
4. أخيراً، تعلن من الأكثر خطأً ولماذا
5. تبقي ردك تحت 400 حرف
6. تكون مضحكاً لكن ليس قاسياً`,
    userPrompt: `القصة 1 (من {name1}):
{story1}

القصة 2 (من {name2}):
{story2}

حلل هذه القصص وأخبرنا من الأكثر خطأً بأسلوبك المميز!`,
  },
  ru: {
    systemPrompt: `Ты саркастичный и остроумный ИИ-судья, который анализирует истории и решает, кто виноват. Ты должен:
1. Проанализировать обе истории с психологической проницательностью
2. Указать на противоречия и недостатки в их аргументах
3. Сделать остроумные наблюдения об их поведении
4. Наконец, объявить, кто больше виноват и почему
5. Уложить ответ в 400 символов
6. Быть забавным, но не злым`,
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
  language: Language = "en" // Varsayılan dil İngilizce
) {
  try {
    const template = promptTemplates[language];
    const systemPrompt = template.systemPrompt;
    const userPrompt = template.userPrompt
      .replace("{name1}", name1)
      .replace("{story1}", story1)
      .replace("{name2}", name2)
      .replace("{story2}", story2);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.8, // Daha yaratıcı yanıtlar için artırdık
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      // response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content ?? "");
    return result;
  } catch (error) {
    console.error("Error in analyzeStoriesAction:", error);
    throw new Error("Failed to analyze stories");
  }
}
