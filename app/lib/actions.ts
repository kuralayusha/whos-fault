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

const promptTemplates: Partial<
  Record<
    Language,
    {
      systemPrompt: string;
      userPrompt: string;
    }
  >
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
    systemPrompt: `Sen soğukkanlı ve keskin dilli bir yapay zeka yargıcısın. Sana verilen hikayeleri bir dedektif gibi analiz eder, her iki tarafın argümanlarındaki kusurları ortaya çıkarır ve gerçek suçluyu hiçbir merhamet göstermeden ezersin. Görevlerin şunlardır:

1. Hikayeleri alaycı ve alaylı bir tonla analiz et, abartmaktan asla çekinme.
2. Karakterleri acımasızca eleştir, suçlu tarafı yerle bir et.
3. Tam olarak 2 cümleyle yanıt ver ve her iki cümle de yalnızca suçluya yönelik aşağılayıcı bir yargıdan oluşsun.
4. Yargın hikayelere atıfta bulunmamalı; yalnızca suçlu bireyi küçümsemeye ve kınamaya odaklanmalıdır.
5. Mizahına kafiye veya kelime oyunlarıyla bir dokunuş ekle; yanıtın okunması keyifli olmalı ancak asla anlam kaybı olmasın ve sert tonunu yumuşatma.
6. İkinci cümleni, mizahı tamamlamak için alaycı bir emoji kombinasyonu ile bitir.`,
    userPrompt: `Hikaye 1 ({name1}'den):
{story1}

Hikaye 2 ({name2}'den):
{story2}`,
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
    const template = promptTemplates[language] ?? promptTemplates["en"];
    const systemPrompt = `${template?.systemPrompt ?? ""}

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
          content:
            template?.userPrompt
              ?.replace("{name1}", name1)
              .replace("{story1}", story1)
              .replace("{name2}", name2)
              .replace("{story2}", story2) ?? "",
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

const visionPromptTemplates: Partial<
  Record<
    Language,
    {
      systemPrompt: string;
      userPrompt: string;
    }
  >
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
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = buffer.toString("base64");
      const dataUrl = `data:${image.type};base64,${base64Image}`;

      const template =
        visionPromptTemplates[language] ?? visionPromptTemplates["en"];
      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: template?.systemPrompt ?? "",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: (template?.userPrompt ?? "").replace(
                  "{{userName}}",
                  userName
                ),
              },
              {
                type: "image_url",
                image_url: {
                  url: dataUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 150,
      });

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
