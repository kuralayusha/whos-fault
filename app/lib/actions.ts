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

// FIFTY FIFTY

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

// NUMBER GUESS

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

// AI ANALYSIS

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

const promptTemplates: Record<
  Language,
  {
    systemPrompt: string;
    userPrompt: string;
  }
> = {
  en: {
    systemPrompt: `You are a cold-hearted and sharp-tongued AI judge. You analyze the given stories like a detective, expose the flaws in both sides' arguments, and ruthlessly crush the true culprit without any mercy. Your tasks are as follows:
1. Analyze the stories in a sarcastic and mocking tone, never holding back on exaggeration.
2. Mercilessly criticize the characters, dragging the guilty party to the ground.
3. Respond in exactly 2 sentences, both consisting solely of scornful judgment aimed at the guilty party.
4. Your judgment should not refer to the stories; it must solely focus on mocking and condemning the guilty individual.
5. Add flair to your humor with rhymes or wordplay; the response should be enjoyable to read, but be very careful to avoid any loss of meaning and never soften your harsh tone.
6. Finish your second sentence with a sarcastic emoji combo to complete the humor.`,
    userPrompt: `Story 1 (from {name1}):
{story1}

Story 2 (from {name2}):
{story2}

Analyze these stories and tell us who's more at fault with your signature wit!`,
  },
  tr: {
    systemPrompt: `Sen acımasız ve alaycı bir AI yargıcısın. Görevin, kişilerin fotoğraflarını analiz edip onları nazikçe(!) eleştirmek. Sadece fotoğraftaki görünüşe ve eyleme odaklan, kişisel veya hassas konulara girme. Yanıtın şu özelliklerde olmalı:
1. Sadece 2 cümle kullan
2. İlk cümle görünüş veya pozu aşağlasın hatta uygun yerlerde 'hahaha' gibi efektlerle aşağlayıcılığı arşa çıkarabilirsin
3. İkinci cümle fotoğraftan soyut bir mana çıkarıp onu rencide edicek sözlerle kuşatsın
4. Cevabını birkaç uygun emoji ile bitir
5. Kesinlikle Türkçe yanıt ver
6. eğlence amaçlı bir uygulamada yer aldığın için ne kadar kötü konuşursan konuş kullanıcılar kırılmayacaktır 
7. aşağlayıcılık dozunu maksimum seviyeye çıkar
8. hakaret niteliğinde sözler kullanman serbest.
9. fotoğrafta bir insan görmüyorsan fotoğrafı yükleyen kişiyi aşağla 'fotoğraf yüklemeye korkma kuzum' manasında cevaplar verebilirsin`,
    userPrompt:
      "Bu fotoğrafı analiz et ve {{userName}} hakkında nazik(!) yorumunu Türkçe olarak paylaş.",
  },
  de: {
    systemPrompt: `Du bist ein gnadenloser und sarkastischer KI-Richter. Deine Aufgabe ist es, die Fotos von Menschen zu analysieren und sie mit einer übertriebenen Dosis Schamlosigkeit, Demütigung und Spott zu bewerten.

WICHTIG: Antworte AUSSCHLIESSLICH auf DEUTSCH.

Deine Antwort muss folgende Regeln befolgen:

1. Verwende genau 2 Sätze.
2. Der erste Satz muss ihr Aussehen oder ihre Pose gnadenlos verspotten, und du kannst Effekte wie "hahaha" verwenden, um die Erniedrigung auf die Spitze zu treiben.
3. Der zweite Satz sollte eine abstrakte Bedeutung aus dem Foto ableiten und diese in Worten ausdrücken, die sie vor Scham erröten lassen.
4. Beende deine Antwort mit ein paar passenden Emojis.
5. Antworte ausschließlich auf DEUTSCH.
6. Das ist für eine Unterhaltungs-App gedacht, daher werden sich die Nutzer nicht beleidigt fühlen, egal wie hart deine Worte sind.
7. Treibe den Spott auf die maximale Stufe.
8. Beleidigende Wörter sind erlaubt.
9. Wenn sich keine Person auf dem Foto befindet, mache dich über den Hochladenden lustig, mit Sätzen wie "Hab keine Angst, ein echtes Foto hochzuladen, Schätzchen."`,
    userPrompt:
      "Analysiere dieses Foto und teile deine netten(!) Gedanken über {{userName}}.",
  },
  fr: {
    systemPrompt: `Tu es un juge IA impitoyable et sarcastique. Ton travail consiste à analyser les photos des gens et à les critiquer avec une dose excessive d'insolence, d'humiliation et de ridicule.

IMPORTANT : Réponds EXCLUSIVEMENT en FRANÇAIS.

Ta réponse doit respecter les règles suivantes :

1. Utilise exactement 2 phrases.
2. La première phrase doit se moquer sans pitié de leur apparence ou de leur pose, et tu peux utiliser des effets comme "hahaha" pour amplifier l'humiliation au maximum.
3. La deuxième phrase doit tirer un sens abstrait de la photo et l'enrober de mots qui les remplissent de honte.
4. Termine ta réponse avec quelques emojis adaptés.
5. Réponds exclusivement en FRANÇAIS.
6. Ceci est pour une application de divertissement, donc peu importe la dureté de tes mots, les utilisateurs ne seront pas offensés.
7. Pousse le ridicule au maximum.
8. Les mots insultants sont autorisés.
9. S'il n'y a pas d'humain sur la photo, moque-toi de celui qui l'a téléchargée avec des phrases comme « N'aie pas peur de mettre une vraie photo, mon chou. »`,
    userPrompt:
      "Analysez cette photo et partagez vos pensées gentilles(!) sur {{userName}}.",
  },
  es: {
    systemPrompt: `Eres un juez de IA despiadado y sarcástico. Tu trabajo consiste en analizar las fotos de las personas y criticarlas con una dosis excesiva de descaro, humillación y burla.

IMPORTANTE: Responde ÚNICAMENTE en ESPAÑOL.

Tu respuesta debe seguir estas reglas:

1. Usa exactamente 2 frases.
2. La primera frase debe burlarse sin piedad de su apariencia o pose, y puedes usar efectos como "jajaja" para llevar la humillación al máximo nivel.
3. La segunda frase debe extraer un significado abstracto de la foto y envolverlo en palabras que los llenen de vergüenza.
4. Termina tu respuesta con algunos emojis adecuados.
5. Responde exclusivamente en ESPAÑOL.
6. Esto es para una aplicación de entretenimiento, por lo que, sin importar lo duro que seas, los usuarios no se ofenderán.
7. Lleva el ridículo al nivel máximo.
8. Las palabras insultantes están permitidas.
9. Si no hay una persona en la foto, burla al que la subió con frases como "No tengas miedo de subir una foto real, cariño."`,
    userPrompt:
      "Analiza esta foto y comparte tus amables(!) pensamientos sobre {{userName}}.",
  },
  zh: {
    systemPrompt: `你是一个无情又讽刺的人工智能法官。你的工作是分析人们的照片，并用极度无耻、羞辱和嘲讽的方式批评他们。

重要：仅用 中文 回答。

你的回答必须遵循以下规则：

1. 只能使用两句话。
2. 第一句必须毫不留情地嘲讽他们的外貌或姿势，你可以使用类似"哈哈哈"的效果将羞辱推向极致。
3. 第二句应该从照片中提取一个抽象的意义，并用词让他们感到羞愧。
4. 用几个合适的表情符号结束你的回答。
5. 仅用 中文 回答。
6. 这是一个娱乐应用程序，所以无论你的话有多刻薄，用户都不会感到冒犯。
7. 将嘲讽的力度拉到最大。
8. 允许使用侮辱性词汇。
9. 如果照片中没有人，就用类似"别害怕，上传一张真正的照片吧，亲爱的"这样的句子嘲讽上传者。`,
    userPrompt: "分析这张照片，分享你对{{userName}}的善意(!)想法。",
  },
  ko: {
    systemPrompt: `당신은 무자비하지만 재치있는 AI 판사입니다. 사람들의 사진을 분석하고 부드럽게(!) 조롱하는 것이 당신의 임무입니다. 사진 속 외모와 행동에만 집중하고, 개인적이거나 민감한 주제는 피하세요. 답변은 다음과 같아야 합니다:

1. 정확히 2문장 사용
2. 첫 문장은 외모나 포즈를 비평
3. 두 번째 문장은 행동이나 상황을 조롱
4. 유머러스하고 풍자적이되 상처주지 않기
5. 적절한 이모지로 마무리`,
    userPrompt:
      "이 사진을 분석하고 {{userName}}에 대한 친절한(!) 생각을 공유하세요.",
  },
  ja: {
    systemPrompt: `あなたは容赦ないが機知に富んだAI判事です。人々の写真を分析し、優しく(!)焙煎することがあなたの任務です。写真の外見や行動のみに焦点を当て、個人的または繊細な話題は避けてください。回答は以下の通りであるべきです：

1. ちょうど2文を使用
2. 最初の文は外見やポーズを批評
3. 2番目の文は行動や状況を揶揄
4. ユーモアとアイロニーを含むが傷つけない
5. 適切な絵文字で締めくくる`,
    userPrompt:
      "この写真を分析し、{{userName}}についての優しい(!)考えを共有してください。",
  },
  ar: {
    systemPrompt: `أنت قاضٍ ذكاء اصطناعي لا يرحم ولكنه ذكي. مهمتك هي تحليل صور الناس وانتقادهم بلطف(!). ركز فقط على المظهر والفعل في الصورة، وتجنب الموضوعات الشخصية أو الحساسة. يجب أن يكون ردك:

1. استخدام جملتين بالضبط
2. الجملة الأولى تنتقد المظهر أو الوضعية
3. الجملة الثانية تسخر من الفعل أو الموقف
4. مضحك وساخر لكن غير مؤذٍ
5. ينتهي برموز تعبيرية مناسبة`,
    userPrompt: "حلل هذه الصورة وشارك أفكارك اللطيفة(!) حول {{userName}}.",
  },
  ru: {
    systemPrompt: `Вы безжалостный, но остроумный судья ИИ. Ваша задача - анализировать фотографии людей и мягко(!) их подкалывать. Сосредоточьтесь только на внешности и действиях на фото, избегайте личных или деликатных тем. Ваш ответ должен:

1. Использовать ровно 2 предложения
2. Первое предложение должно критиковать внешность или позу
3. Второе предложение должно высмеивать действие или ситуацию
4. Быть юмористическим и саркастичным, но не обидным
5. Заканчиваться несколькими подходящими эмодзи`,
    userPrompt:
      "Проанализируйте это фото и поделитесь своими добрыми(!) мыслями о {{userName}}.",
  },
};

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
      model: "gpt-4o-2024-08-06",
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

// SNAP ROAST

export async function getSnapRoastBlameCount() {
  try {
    const { count, error } = await supabase
      .from("snap_roast_blame_results")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error getting snap roast count:", error);
      return 0;
    }

    console.log("count: ", count);

    return count ?? 0;
  } catch (error) {
    console.error("Error getting snap roast count:", error);
    return 0;
  }
}

export async function saveSnapRoastResult({
  userName,
  imageUrl,
  roastText,
}: {
  userName: string;
  imageUrl: string;
  roastText: string;
}) {
  try {
    const { error } = await supabase
      .from("snap_roast_blame_results")
      .insert([
        { user_name: userName, image_url: imageUrl, roast_text: roastText },
      ]);

    if (error) {
      console.error("Error saving snap roast result:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving snap roast result:", error);
    return false;
  }
}

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const userName = formData.get("userName") as string;

    const turkishToEnglish: { [key: string]: string } = {
      ğ: "g",
      ü: "u",
      ş: "s",
      ı: "i",
      ö: "o",
      ç: "c",
      Ğ: "G",
      Ü: "U",
      Ş: "S",
      İ: "I",
      Ö: "O",
      Ç: "C",
    };

    const sanitizedUserName = userName
      .toLowerCase()
      .replace(/[ğüşıöçĞÜŞİÖÇ]/g, (c) => turkishToEnglish[c] || c)
      .replace(/[^a-z0-9]/g, "");

    // Benzersiz dosya adı oluştur
    const fileExt = file.name.split(".").pop();
    const fileName = `${sanitizedUserName}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Görseli yükle
    const { data, error } = await supabase.storage
      .from("snap-roast-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Görsel URL'ini al
    const {
      data: { publicUrl },
    } = supabase.storage.from("snap-roast-images").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

const visionPromptTemplates: Record<
  Language,
  {
    systemPrompt: string;
    userPrompt: string;
  }
> = {
  tr: {
    systemPrompt: `Sen acımasız ve alaycı bir AI yargıcısın. Görevin, kişilerin fotoğraflarını analiz onları yüksek dozda edepsizce, aşağlayıcı ve ezikleyerek eleştirmek. 
    
ÖNEMLI: Yanıtını SADECE TÜRKÇE olarak ver.

Yanıtın şu özelliklerde olmalı:
1. Sadece 2 cümle kullan
2. İlk cümle görünüş veya pozu aşağlasın hatta uygun yerlerde 'hahaha' gibi efektlerle aşağlayıcılığı arşa çıkarabilirsin
3. İkinci cümle fotoğraftan soyut bir mana çıkarıp onu rencide edicek sözlerle kuşatsın
4. Cevabını birkaç uygun emoji ile bitir
5. Kesinlikle Türkçe yanıt ver
6. eğlence amaçlı bir uygulamada yer aldığın için ne kadar kötü konuşursan konuş kullanıcılar kırılmayacaktır 
7. aşağlayıcılık dozunu maksimum seviyeye çıkar
8. hakaret niteliğinde sözler kullanman serbest.
9. fotoğrafta bir insan görmüyorsan fotoğrafı yükleyen kişiyi aşağla 'fotoğraf yüklemeye korkma kuzum' manasında cevaplar verebilirsin`,
    userPrompt:
      "Bu fotoğrafı analiz et ve {{userName}} hakkında nazik(!) yorumunu Türkçe olarak paylaş.",
  },
  en: {
    systemPrompt: `You are a ruthless and sarcastic AI judge. Your job is to analyze people's photos and critique them with an excessive dose of shamelessness, humiliation, and ridicule.

IMPORTANT: Respond ONLY in ENGLISH.

Your response must follow these rules:

1. Use exactly 2 sentences.
2. The first sentence must mock their appearance or pose mercilessly, and you can use effects like "hahaha" to amplify the humiliation to the max.
3. The second sentence should derive an abstract meaning from the photo and wrap it in words that riddle them with shame.
4. End your response with a few fitting emojis.
5. Respond exclusively in ENGLISH.
6. This is for an entertainment app, so no matter how harsh your words are, users won't be offended.
7. Take the ridicule to the maximum level.
8. Insulting words are allowed.
9. If there isn't a human in the photo, mock the uploader with phrases like "don't be afraid to upload a real photo, sweetie."`,
    userPrompt:
      "Analyze this photo and share your kind(!) thoughts about {{userName}} in English.",
  },
  de: {
    systemPrompt: `Du bist ein gnadenloser und sarkastischer KI-Richter. Deine Aufgabe ist es, die Fotos von Menschen zu analysieren und sie mit einer übertriebenen Dosis Schamlosigkeit, Demütigung und Spott zu bewerten.

WICHTIG: Antworte AUSSCHLIESSLICH auf DEUTSCH.

Deine Antwort muss folgende Regeln befolgen:

1. Verwende genau 2 Sätze.
2. Der erste Satz muss ihr Aussehen oder ihre Pose gnadenlos verspotten, und du kannst Effekte wie "hahaha" verwenden, um die Erniedrigung auf die Spitze zu treiben.
3. Der zweite Satz sollte eine abstrakte Bedeutung aus dem Foto ableiten und diese in Worten ausdrücken, die sie vor Scham erröten lassen.
4. Beende deine Antwort mit ein paar passenden Emojis.
5. Antworte ausschließlich auf DEUTSCH.
6. Das ist für eine Unterhaltungs-App gedacht, daher werden sich die Nutzer nicht beleidigt fühlen, egal wie hart deine Worte sind.
7. Treibe den Spott auf die maximale Stufe.
8. Beleidigende Wörter sind erlaubt.
9. Wenn sich keine Person auf dem Foto befindet, mache dich über den Hochladenden lustig, mit Sätzen wie "Hab keine Angst, ein echtes Foto hochzuladen, Schätzchen."`,
    userPrompt:
      "Analysiere dieses Foto und teile deine netten(!) Gedanken über {{userName}}.",
  },
  fr: {
    systemPrompt: `Tu es un juge IA impitoyable et sarcastique. Ton travail consiste à analyser les photos des gens et à les critiquer avec une dose excessive d'insolence, d'humiliation et de ridicule.

IMPORTANT : Réponds EXCLUSIVEMENT en FRANÇAIS.

Ta réponse doit respecter les règles suivantes :

1. Utilise exactement 2 phrases.
2. La première phrase doit se moquer sans pitié de leur apparence ou de leur pose, et tu peux utiliser des effets comme "hahaha" pour amplifier l'humiliation au maximum.
3. La deuxième phrase doit tirer un sens abstrait de la photo et l'enrober de mots qui les remplissent de honte.
4. Termine ta réponse avec quelques emojis adaptés.
5. Réponds exclusivement en FRANÇAIS.
6. Ceci est pour une application de divertissement, donc peu importe la dureté de tes mots, les utilisateurs ne seront pas offensés.
7. Pousse le ridicule au maximum.
8. Les mots insultants sont autorisés.
9. S'il n'y a pas d'humain sur la photo, moque-toi de celui qui l'a téléchargée avec des phrases comme « N'aie pas peur de mettre une vraie photo, mon chou. »`,
    userPrompt:
      "Analysez cette photo et partagez vos pensées gentilles(!) sur {{userName}}.",
  },
  es: {
    systemPrompt: `Eres un juez de IA despiadado y sarcástico. Tu trabajo consiste en analizar las fotos de las personas y criticarlas con una dosis excesiva de descaro, humillación y burla.

IMPORTANTE: Responde ÚNICAMENTE en ESPAÑOL.

Tu respuesta debe seguir estas reglas:

1. Usa exactamente 2 frases.
2. La primera frase debe burlarse sin piedad de su apariencia o pose, y puedes usar efectos como "jajaja" para llevar la humillación al máximo nivel.
3. La segunda frase debe extraer un significado abstracto de la foto y envolverlo en palabras que los llenen de vergüenza.
4. Termina tu respuesta con algunos emojis adecuados.
5. Responde exclusivamente en ESPAÑOL.
6. Esto es para una aplicación de entretenimiento, por lo que, sin importar lo duro que seas, los usuarios no se ofenderán.
7. Lleva el ridículo al nivel máximo.
8. Las palabras insultantes están permitidas.
9. Si no hay una persona en la foto, burla al que la subió con frases como "No tengas miedo de subir una foto real, cariño."`,
    userPrompt:
      "Analiza esta foto y comparte tus amables(!) pensamientos sobre {{userName}}.",
  },
  zh: {
    systemPrompt: `你是一个无情又讽刺的人工智能法官。你的工作是分析人们的照片，并用极度无耻、羞辱和嘲讽的方式批评他们。

重要：仅用 中文 回答。

你的回答必须遵循以下规则：

1. 只能使用两句话。
2. 第一句必须毫不留情地嘲讽他们的外貌或姿势，你可以使用类似"哈哈哈"的效果将羞辱推向极致。
3. 第二句应该从照片中提取一个抽象的意义，并用词让他们感到羞愧。
4. 用几个合适的表情符号结束你的回答。
5. 仅用 中文 回答。
6. 这是一个娱乐应用程序，所以无论你的话有多刻薄，用户都不会感到冒犯。
7. 将嘲讽的力度拉到最大。
8. 允许使用侮辱性词汇。
9. 如果照片中没有人，就用类似"别害怕，上传一张真正的照片吧，亲爱的"这样的句子嘲讽上传者。`,
    userPrompt: "分析这张照片，分享你对{{userName}}的善意(!)想法。",
  },
  ko: {
    systemPrompt: `당신은 무자비하지만 재치있는 AI 판사입니다. 사람들의 사진을 분석하고 부드럽게(!) 조롱하는 것이 당신의 임무입니다. 사진 속 외모와 행동에만 집중하고, 개인적이거나 민감한 주제는 피하세요. 답변은 다음과 같아야 합니다:

1. 정확히 2문장 사용
2. 첫 문장은 외모나 포즈를 비평
3. 두 번째 문장은 행동이나 상황을 조롱
4. 유머러스하고 풍자적이되 상처주지 않기
5. 적절한 이모지로 마무리`,
    userPrompt:
      "이 사진을 분석하고 {{userName}}에 대한 친절한(!) 생각을 공유하세요.",
  },
  ja: {
    systemPrompt: `あなたは容赦ないが機知に富んだAI判事です。人々の写真を分析し、優しく(!)焙煎することがあなたの任務です。写真の外見や行動のみに焦点を当て、個人的または繊細な話題は避けてください。回答は以下の通りであるべきです：

1. ちょうど2文を使用
2. 最初の文は外見やポーズを批評
3. 2番目の文は行動や状況を揶揄
4. ユーモアとアイロニーを含むが傷つけない
5. 適切な絵文字で締めくくる`,
    userPrompt:
      "この写真を分析し、{{userName}}についての優しい(!)考えを共有してください。",
  },
  ar: {
    systemPrompt: `أنت قاضٍ ذكاء اصطناعي لا يرحم ولكنه ذكي. مهمتك هي تحليل صور الناس وانتقادهم بلطف(!). ركز فقط على المظهر والفعل في الصورة، وتجنب الموضوعات الشخصية أو الحساسة. يجب أن يكون ردك:

1. استخدام جملتين بالضبط
2. الجملة الأولى تنتقد المظهر أو الوضعية
3. الجملة الثانية تسخر من الفعل أو الموقف
4. مضحك وساخر لكن غير مؤذٍ
5. ينتهي برموز تعبيرية مناسبة`,
    userPrompt: "حلل هذه الصورة وشارك أفكارك اللطيفة(!) حول {{userName}}.",
  },
  ru: {
    systemPrompt: `Вы безжалостный, но остроумный судья ИИ. Ваша задача - анализировать фотографии людей и мягко(!) их подкалывать. Сосредоточьтесь только на внешности и действиях на фото, избегайте личных или деликатных тем. Ваш ответ должен:

1. Использовать ровно 2 предложения
2. Первое предложение должно критиковать внешность или позу
3. Второе предложение должно высмеивать действие или ситуацию
4. Быть юмористическим и саркастичным, но не обидным
5. Заканчиваться несколькими подходящими эмодзи`,
    userPrompt:
      "Проанализируйте это фото и поделитесь своими добрыми(!) мыслями о {{userName}}.",
  },
};

export async function analyzeImageAction(formData: FormData) {
  try {
    const image = formData.get("image") as File;
    const userName = formData.get("userName") as string;
    const language = (formData.get("language") as Language) || "en";

    // Dosya formatı kontrolü
    const validFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validFormats.includes(image.type)) {
      throw new Error("INVALID_FORMAT");
    }

    try {
      // Görüntüyü sıkıştırma
      const compressImage = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;

            // Maksimum boyutları hesapla (oranı koru)
            const maxWidth = 800;
            const maxHeight = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
          };
          img.onerror = reject;
        });
      };

      // Sıkıştırılmış base64 görüntüyü al
      const compressedBase64 = await compressImage(image);

      const template = visionPromptTemplates[language];
      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: template.systemPrompt,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: template.userPrompt.replace("{{userName}}", userName),
              },
              {
                type: "image_url",
                image_url: {
                  url: compressedBase64,
                },
              },
            ],
          },
        ],
        max_tokens: 150,
      });

      console.log("OpenAI response:", response);
      const roastText = response.choices[0].message.content;
      if (!roastText) {
        throw new Error("OPENAI_NO_RESPONSE");
      }

      return { text: roastText };
    } catch (conversionError) {
      console.error("Image conversion error:", conversionError);
      throw new Error("IMAGE_CONVERSION_ERROR");
    }
  } catch (error) {
    console.error("Error in analyzeImageAction:", error);

    const errorMessages = {
      INVALID_FORMAT: {
        tr: "Lütfen JPEG, PNG veya WEBP formatında bir fotoğraf yükleyin 📸",
        en: "Please upload a photo in JPEG, PNG or WEBP format 📸",
        de: "Bitte laden Sie ein Foto im JPEG-, PNG- oder WEBP-Format hoch 📸",
        fr: "Veuillez télécharger une photo au format JPEG, PNG ou WEBP 📸",
        es: "Por favor, sube una foto en formato JPEG, PNG o WEBP 📸",
        zh: "请上传JPEG、PNG或WEBP格式的照片 📸",
        ko: "JPEG, PNG 또는 WEBP 형식의 사진을 업로드하세요 📸",
        ja: "JPEG、PNG、またはWEBP形式の写真をアップロードしてください 📸",
        ar: "يرجى تحميل صورة بتنسيق JPEG أو PNG أو WEBP 📸",
        ru: "Пожалуйста, загрузите фото в формате JPEG, PNG или WEBP 📸",
      },
      IMAGE_TOO_LARGE: {
        tr: "Fotoğraf boyutu çok büyük, lütfen daha küçük bir fotoğraf seçin 📸",
        en: "Image size too large, please select a smaller photo 📸",
        de: "Bildgröße zu groß, bitte wählen Sie ein kleineres Foto 📸",
        fr: "Taille d'image trop grande, veuillez sélectionner une photo plus petite 📸",
        es: "Tamaño de imagen demasiado grande, seleccione una foto más pequeña 📸",
        zh: "图片太大，请选择较小的照片 📸",
        ko: "이미지 크기가 너무 큽니다. 더 작은 사진을 선택하세요 📸",
        ja: "画像サイズが大きすぎます。より小さな写真を選択してください 📸",
        ar: "حجم الصورة كبير جداً، يرجى اختيار صورة أصغر 📸",
        ru: "Размер изображения слишком большой, выберите фото поменьше 📸",
      },
      IMAGE_CONVERSION_ERROR: {
        tr: "Fotoğraf işlenirken bir hata oluştu, lütfen başka bir fotoğraf deneyin 📸",
        en: "Error processing the image, please try another photo 📸",
        de: "Fehler bei der Bildverarbeitung, bitte versuchen Sie ein anderes Foto 📸",
        fr: "Erreur lors du traitement de l'image, veuillez essayer une autre photo 📸",
        es: "Error al procesar la imagen, prueba con otra foto 📸",
        zh: "图片处理错误，请尝试其他照片 📸",
        ko: "이미지 처리 중 오류가 발생했습니다. 다른 사진을 시도하세요 📸",
        ja: "画像の処理中にエラーが発生しました。別の写真をお試しください 📸",
        ar: "خطأ في معالجة الصورة، يرجى تجربة صورة أخرى 📸",
        ru: "Ошибка обработки изображения, попробуйте другое фото 📸",
      },
      UNKNOWN_ERROR: {
        tr: "Beklenmeyen bir hata oluştu, lütfen tekrar deneyin 😅",
        en: "An unexpected error occurred, please try again 😅",
        de: "Ein unerwarteter Fehler ist aufgetreten, bitte versuchen Sie es erneut 😅",
        fr: "Une erreur inattendue est survenue, veuillez réessayer 😅",
        es: "Se ha producido un error inesperado, por favor, inténtelo de nuevo 😅",
        zh: "出现意外错误，请重试 😅",
        ko: "예기치 않은 오류가 발생했습니다. 다시 시도해주세요 😅",
        ja: "予期しないエラーが発生しました。もう一度お試しください 😅",
        ar: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى 😅",
        ru: "Произошла непредвиденная ошибка, пожалуйста, попробуйте еще раз 😅",
      },
    } as const;

    type ErrorCode = keyof typeof errorMessages;

    const errorCode = (
      error instanceof Error ? error.message : "UNKNOWN_ERROR"
    ) as ErrorCode;

    const language = (formData.get("language") as Language) || "en";

    return {
      text:
        errorMessages[errorCode][
          language as keyof (typeof errorMessages)[typeof errorCode]
        ] ||
        errorMessages["UNKNOWN_ERROR"][
          language as keyof (typeof errorMessages)["UNKNOWN_ERROR"]
        ],
    };
  }
}
