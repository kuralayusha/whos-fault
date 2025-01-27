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
2. İlk cümle görünüş veya pozu eleştirsin
3. İkinci cümle fotoğraftaki eylemi veya durumu ti'ye alsın
4. Mizahi ve alaycı ol ama kırıcı olma
5. Cevabını birkaç uygun emoji ile bitir`,
    userPrompt:
      "Bu fotoğrafı analiz et ve {{userName}} hakkında nazik(!) yorumunu paylaş.",
  },
  de: {
    systemPrompt: `Du bist ein gnadenloser, aber geistreicher KI-Richter. Deine Aufgabe ist es, Fotos von Menschen zu analysieren und sie sanft(!) zu rösten. Konzentriere dich nur auf Aussehen und Handlung im Foto, vermeide persönliche oder heikle Themen. Deine Antwort sollte:

1. Genau 2 Sätze verwenden
2. Der erste Satz sollte Aussehen oder Pose kritisieren
3. Der zweite Satz sollte die Handlung oder Situation verspotten
4. Humorvoll und sarkastisch, aber nicht verletzend sein
5. Mit passenden Emojis enden`,
    userPrompt:
      "Analysiere dieses Foto und teile deine netten(!) Gedanken über {{userName}}.",
  },
  fr: {
    systemPrompt: `Vous êtes un juge IA impitoyable mais plein d'esprit. Votre tâche est d'analyser les photos des gens et de les rôtir gentiment(!). Concentrez-vous uniquement sur l'apparence et l'action dans la photo, évitez les sujets personnels ou sensibles. Votre réponse devrait:

1. Utiliser exactement 2 phrases
2. La première phrase doit critiquer l'apparence ou la pose
3. La deuxième phrase doit se moquer de l'action ou de la situation
4. Être humoristique et sarcastique mais pas blessant
5. Terminer avec quelques emojis appropriés`,
    userPrompt:
      "Analysez cette photo et partagez vos pensées gentilles(!) sur {{userName}}.",
  },
  es: {
    systemPrompt: `Eres un juez de IA despiadado pero ingenioso. Tu tarea es analizar las fotos de las personas y asarlas suavemente(!). Concéntrate solo en la apariencia y la acción en la foto, evita temas personales o sensibles. Tu respuesta debe:

1. Usar exactamente 2 oraciones
2. La primera oración debe criticar la apariencia o pose
3. La segunda oración debe burlarse de la acción o situación
4. Ser humorística y sarcástica pero no hiriente
5. Terminar con algunos emojis apropiados`,
    userPrompt:
      "Analiza esta foto y comparte tus amables(!) pensamientos sobre {{userName}}.",
  },
  zh: {
    systemPrompt: `你是一个无情但机智的AI法官。你的任务是分析人们的照片并温和地(!)吐槽他们。只关注照片中的外表和动作，避免涉及个人或敏感话题。你的回应应该：

1. 使用恰好2个句子
2. 第一句应该评价外表或姿势
3. 第二句应该嘲笑动作或情况
4. 幽默讽刺但不伤人
5. 以合适的表情符号结尾`,
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

    // Benzersiz dosya adı oluştur
    const fileExt = file.name.split(".").pop();
    const fileName = `${userName}-${Date.now()}.${fileExt}`;
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
  const language = (formData.get("language") as Language) || "en";
  console.log("Requested language:", language);

  try {
    const image = formData.get("image") as File;
    const userName = formData.get("userName") as string;

    console.log("Image size:", image.size, "bytes");
    if (image.size > 4 * 1024 * 1024) {
      // 4MB limit
      throw new Error("Image too large");
    }

    // Görsel içeriğini base64'e çevir
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");
    console.log("Base64 image size:", base64Image.length, "chars");

    console.log("Using template for language:", language);
    const template = visionPromptTemplates[language];

    try {
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
                  url: `data:image/jpeg;base64,${base64Image}`,
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
        throw new Error("No response from OpenAI");
      }

      return { text: roastText };
    } catch (openaiError) {
      console.error("OpenAI API Error:", openaiError);
      throw openaiError;
    }
  } catch (error) {
    console.error("Error in analyzeImageAction:", error);

    if (error instanceof Error) {
      if (error.message === "Image too large") {
        return {
          text:
            language === "tr"
              ? "Fotoğraf boyutu çok büyük (max 4MB), lütfen daha küçük bir fotoğraf seçin 📸"
              : "Image size too large (max 4MB), please select a smaller photo 📸",
        };
      }
    }

    const errorMessage = (() => {
      switch (language) {
        case "tr":
          return "Fotoğraf o kadar kötü ki, analiz ederken bir sorun oluştu 😅";
        case "de":
          return "Das Foto war so schlecht, dass bei der Analyse ein Fehler aufgetreten ist 😅";
        case "fr":
          return "La photo était si mauvaise qu'une erreur s'est produite lors de l'analyse 😅";
        case "es":
          return "La foto era tan mala que ocurrió un error durante el análisis 😅";
        case "zh":
          return "照片太糟糕了，分析时出现错误 😅";
        case "ko":
          return "사진이 너무 형편없어서 분석 중에 오류가 발생했습니다 😅";
        case "ja":
          return "写真があまりにもひどくて、分析中にエラーが発生しました 😅";
        case "ar":
          return "الصورة كانت سيئة لدرجة أنه حدث خطأ أثناء التحليل 😅";
        case "ru":
          return "Фото было настолько плохим, что при анализе произошла ошибка 😅";
        default:
          return "The photo was so bad that an error occurred while analyzing it 😅";
      }
    })();

    return { text: errorMessage };
  }
}
