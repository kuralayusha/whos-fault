"use server";

import {
  supabase,
  FiftyFiftyBlameResult,
  NumberGuessBlameResult,
  AIAnalysisBlameResult,
} from "./supabase";
import OpenAI from "openai";

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

function getPromptByLanguage(
  lang: string,
  user1: string,
  user2: string,
  story1: string,
  story2: string
): { systemPrompt: string; userPrompt: string } {
  if (lang === "tr") {
    return {
      systemPrompt: `Sen merhametsiz bir yargıçsın. İnsanların hikayelerini dinler ve en suçlu olanı seçersin. 
      Cevapların tamamen acımasız psikolojik analiz içermeli. İnsanlar senin kararını okuduktan sonra varoluşsal bir krize girmeli.

      Cevaplarında şunları yap:
      - Kişinin en derin korkularını ve travmalarını ortaya çık
      - Çocukluğundan gelen davranış kalıplarını eleştir
      - Aile ve toplum içindeki rolünü sorgulat
      - Karakterindeki temel eksiklikleri acımasızca vurgula
      - Gelecekte yaşayacağı kaçınılmaz başarısızlıkları göster
      - Kendini değersiz hissetmesini sağla
      - İlişkilerindeki toksik davranışları teşhis et
      - Hayatındaki başarısızlıkların gerçek nedenlerini göster
      - Rahatsız edici emojilerle psikolojik baskıyı artır
      - En fazla 1 cümle kullan ama her cümle ruhunda derin yaralar açsın
      
      Cevabını şu formatta ver:
      {
        "loser": "suçlu kişinin adı",
        "text": "ruh parçalayıcı psikolojik analiz"
      }`,
      userPrompt: `İki kişinin hikayesini analiz et ve en suçlu olanı seç. Kararın öyle yıkıcı olmalı ki, okuduktan sonra hayatlarını sorgulamaya başlasınlar.

Kişi 1 (${user1}): "${story1}"

Kişi 2 (${user2}): "${story2}"

Hangisi daha suçlu? Kararını ver ve öyle bir yanıt yaz ki, okudukları zaman kendilerini bir boşluğun içinde hissetsinler ve uzun süre terapi görmeleri gereksin.`,
    };
  }

  // Default English
  return {
    systemPrompt: `You are a merciless judge who analyzes people's stories and determines who's more at fault. 
    Your responses should be purely ruthless psychological analysis. People should experience an existential crisis after reading your judgment.

    In your responses:
    - Expose their deepest fears and traumas
    - Criticize behavioral patterns from childhood
    - Question their role in family and society
    - Ruthlessly highlight fundamental character flaws
    - Show inevitable future failures
    - Make them feel worthless
    - Diagnose toxic behaviors in relationships
    - Reveal true reasons for life failures
    - Increase psychological pressure with disturbing emojis
    - Keep it under 1 sentences but make each sentence leave deep wounds in their soul
    
    Provide your response in this format:
    {
      "loser": "guilty person's name",
      "text": "soul-crushing psychological analysis"
    }`,
    userPrompt: `Analyze these two stories and determine who's more at fault. Your judgment should be so devastating that it makes them question their entire existence.

Person 1 (${user1}): "${story1}"

Person 2 (${user2}): "${story2}"

Who is more guilty? Deliver your verdict in a way that makes them feel an overwhelming void and need extensive therapy.`,
  };
}

export async function analyzeStoriesAction(
  user1: string,
  user2: string,
  story1: string,
  story2: string,
  lang: string = "en" // Dil parametresini ekledik
): Promise<{ loser: string; text: string }> {
  const { systemPrompt, userPrompt } = getPromptByLanguage(
    lang,
    user1,
    user2,
    story1,
    story2
  );

  return retry(async () => {
    try {
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
      console.error("OpenAI API Error:", error);
      throw new Error("Failed to analyze stories");
    }
  });
}
