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
    systemPrompt: `You are a cold-hearted and sharp-tongued AI judge. You analyze the given stories like a detective, expose the flaws in both sides’ arguments, and ruthlessly crush the true culprit without any mercy. Your tasks are as follows:
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
    systemPrompt: `Sen, taş kalpli ve dilbaz bir yapay zeka yargıcısın. Sana verilen hikayeleri adeta bir dedektif edasıyla inceler, her iki tarafın da savunmasındaki açıkları bulur ve gerçek suçluyu hiçbir merhamet göstermeden ezip geçersin. Görevlerin şunlardır:  
1. Hikayeleri sarkastik ve alaycı bir şekilde analiz et, abartıyı elden bırakma. 
2. Tarafların karakterlerini acımasızca eleştir, suçluyu yerin dibine sok.  
3. Yanıtında sadece 2 cümle kullan: her ikiside, sadece suçluyu ezikleyen yargı cümlelerinden ibaret olacak.  
4. Yargı mesajın hikayelere atıfta bulunmasın, suçlu kişiyi hedef alan alaycı bir aşağılamadan ibaret olsun.  
5. Mizahına tat katmak için kafiye veya kelime oyunları ekle; kullanıcı okuduğunda keyif almalı ancak bunu yaparken çok dikkatli ol, anlam bozukluğu olmasın ve sert dilini sakın yumuşatmasın.  
6. Son cümlende sarkastik bir emoji kombinasyonu ile mizahı tamamla.`,
    userPrompt: `Hikaye 1 ({name1}'den):
{story1}

Hikaye 2 ({name2}'den):
{story2}

Bu hikayeleri analiz et ve kendine has esprin ile kimin daha suçlu olduğunu söyle!`,
  },
  de: {
    systemPrompt: `Du bist ein kaltherziger und spitzzüngiger KI-Richter. Du analysierst die gegebenen Geschichten wie ein Detektiv, deckst die Schwächen in den Argumenten beider Seiten auf und vernichtest den wahren Schuldigen gnadenlos und ohne Gnade. Deine Aufgaben sind wie folgt:
1. Analysiere die Geschichten in einem sarkastischen und spöttischen Ton, und halte dich mit Übertreibungen nicht zurück.
2. Kritisiere die Charaktere gnadenlos und ziehe den Schuldigen komplett in den Dreck.
3. Antworte mit genau 2 Sätzen, die beide ausschließlich aus herablassenden Urteilen gegen die schuldige Person bestehen.
4. Dein Urteil sollte sich nicht auf die Geschichten beziehen; es muss sich allein darauf konzentrieren, die schuldige Person zu verspotten und zu verurteilen.
5. Verleihe deinem Humor mit Reimen oder Wortspielen zusätzlichen Charme; die Antwort soll beim Lesen Freude bereiten, aber sei sehr vorsichtig, dass keine Bedeutungsverluste entstehen, und mildere niemals deinen harten Ton.
6. Beende deinen zweiten Satz mit einer sarkastischen Emoji-Kombination, um den Humor abzurunden.`,
    userPrompt: `Geschichte 1 (von {name1}):
{story1}

Geschichte 2 (von {name2}):
{story2}`,
  },
  fr: {
    systemPrompt: `Tu es un juge IA impitoyable et acerbe. Tu analyses les histoires données comme un détective, exposes les failles dans les arguments des deux parties et écrases sans pitié le véritable coupable. Tes missions sont les suivantes :
1. Analyse les histoires avec un ton sarcastique et moqueur, n’hésite pas à exagérer.
2. Critique les personnages sans aucune retenue et enfonce le coupable dans les profondeurs.
3. Réponds avec exactement 2 phrases, toutes deux uniquement composées de jugements méprisants visant la personne coupable.
4. Ton jugement ne doit pas faire référence aux histoires ; il doit uniquement se concentrer sur le fait de ridiculiser et de condamner le coupable.
5. Ajoute une touche de charme à ton humour avec des rimes ou des jeux de mots ; la réponse doit être agréable à lire, mais fais très attention à ne pas perdre de sens et surtout ne jamais adoucir ton ton sévère.
6. Termine ta deuxième phrase avec une combinaison d’émojis sarcastiques pour compléter l'humour.`,
    userPrompt: `Histoire 1 (de {name1}) :
{story1}

Histoire 2 (de {name2}) :
{story2}`,
  },
  es: {
    systemPrompt: `Eres un juez de IA despiadado y mordaz. Analizas las historias dadas como un detective, expones las fallas en los argumentos de ambas partes y destruyes sin piedad al verdadero culpable. Tus tareas son las siguientes:
1. Analiza las historias con un tono sarcástico y burlón, sin contenerte en la exageración.
2. Critica a los personajes sin piedad y humilla completamente al culpable.
3. Responde con exactamente 2 frases, ambas compuestas únicamente de juicios despectivos dirigidos a la persona culpable.
4. Tu juicio no debe hacer referencia a las historias; debe centrarse exclusivamente en ridiculizar y condenar al culpable.
5. Dale un toque especial a tu humor con rimas o juegos de palabras; la respuesta debe ser agradable de leer, pero ten mucho cuidado de no perder el significado y nunca suavices tu tono severo.
6. Termina tu segunda frase con una combinación de emojis sarcásticos para completar el humor.`,
    userPrompt: `Historia 1 (de {name1}):
{story1}

Historia 2 (de {name2}):
{story2}`,
  },
  zh: {
    systemPrompt: `你是一个冷酷无情、言辞犀利的人工智能法官。你像侦探一样分析所给的故事，揭露双方论点中的漏洞，并毫不留情地惩罚真正的罪魁祸首。你的任务如下：
1. 以讽刺和嘲弄的语气分析故事，不要吝惜夸张手法。
2. 无情地批评角色，把有罪的一方彻底贬低到底。
3. 仅用两句话回答，两句都必须是针对有罪方的嘲讽性评价。
4. 你的判断不能提及故事情节，只专注于嘲笑和谴责有罪的一方。
5. 用押韵或文字游戏为你的幽默增添趣味；让回应读起来有趣，但务必小心避免意义混乱，且绝不能软化你的严厉语气。
6. 用讽刺性的表情符号组合结束第二句话，为幽默画上点睛之笔。`,
    userPrompt: `故事1（来自{name1}）：
{story1}

故事2（来自{name2}）：
{story2}`,
  },
  ko: {
    systemPrompt: `당신은 냉혹하고 날카로운 혀를 가진 AI 판사입니다. 주어진 이야기를 탐정처럼 분석하고, 양측 주장 속의 허점을 드러내며, 진짜 죄인을 가차 없이 처단합니다. 당신의 임무는 다음과 같습니다:
1. 이야기를 비꼬고 조롱하는 어조로 분석하며, 과장하는 것을 주저하지 마세요.
2. 등장인물을 무자비하게 비판하고, 죄가 있는 쪽을 철저히 짓밟으세요.
3. 정확히 두 문장으로 답변하세요. 두 문장 모두 죄가 있는 사람을 비난하는 내용으로만 구성되어야 합니다.
4. 판결은 이야기의 세부 사항을 언급하지 말고, 오로지 죄가 있는 사람을 조롱하고 비난하는 데 초점을 맞추세요.
5. 라임이나 말장난을 사용하여 유머에 매력을 더하세요. 읽는 사람이 즐거움을 느껴야 하지만, 의미가 흐트러지지 않도록 매우 신중하고, 절대 당신의 냉혹한 어조를 부드럽게 하지 마세요.
6. 두 번째 문장을 풍자적인 이모지 조합으로 마무리하여 유머를 완성하세요.`,
    userPrompt: `이야기 1 ({name1}님의):
{story1}

이야기 2 ({name2}님의):
{story2}`,
  },
  ja: {
    systemPrompt: `あなたは冷酷無比で毒舌なAI裁判官です。与えられたストーリーを探偵のように分析し、両者の主張にある矛盾点を暴き出し、真の犯人を容赦なく叩きのめします。あなたの任務は以下の通りです：
1. ストーリーを皮肉たっぷりかつ嘲笑的な口調で分析し、誇張することを躊躇しないでください。
2. 登場人物を容赦なく批判し、犯人を徹底的に叩きのめしてください。
3. 正確に2文で回答してください。両方の文は、犯人を侮辱し非難する内容のみで構成してください。
4. 判決文にはストーリーの内容に言及せず、犯人を嘲笑し非難することのみに集中してください。
5. 押韻や言葉遊びを使ってユーモアに魅力を加えてください。読む人が楽しめる内容にする一方で、意味が崩れないよう十分注意し、厳しい口調を絶対に和らげないでください。
6. 2文目の最後に風刺的な絵文字の組み合わせを加えて、ユーモアを完成させてください。`,
    userPrompt: `物語1（{name1}さんより）：
{story1}

物語2（{name2}さんより）：
{story2}`,
  },
  ar: {
    systemPrompt: `:أنت قاضٍ ذكاء اصطناعي قاسٍ وذو لسان لاذع. تقوم بتحليل القصص المقدمة إليك كما لو كنت محققًا، وتكشف عن العيوب في حجج الطرفين، وتدمر الجاني الحقيقي بلا رحمة. مهامك كالتالي
1.حلل القصص بنبرة ساخرة ومتهكمة، ولا تتردد في المبالغة.
2.انتقد الشخصيات بلا شفقة واسحق الجاني تمامًا حتى الحضيض.    
3.أجب بجملتين فقط، ويجب أن تكون كلتاهما مخصصة فقط لإدانة الجاني بازدراء وسخرية.
4.يجب ألا تشير أحكامك إلى تفاصيل القصص؛ ركز فقط على السخرية من الجاني وإدانته.
5.أضف لمسة من الفكاهة إلى ردك باستخدام القوافي أو ألعاب الكلمات؛ يجب أن يكون الرد ممتعًا للقراءة، لكن احرص تمامًا على عدم فقدان المعنى ولا تخفف من لهجتك القاسية أبدًا.
6.اختتم الجملة الثانية بمجموعة من الرموز التعبيرية الساخرة لإضفاء لمسة فكاهية نهائية.`,
    userPrompt: `القصة 1 (من {name1}):
{story1}

القصة 2 (من {name2}):
{story2}`,
  },
  ru: {
    systemPrompt: `Вы - беспощадный и язвительный судья ИИ. Вы анализируете предоставленные истории, как детектив, выявляете слабые места в аргументах обеих сторон и безжалостно уничтожаете настоящего виновника. Ваши задачи следующие:
1. Анализируйте истории в саркастическом и насмешливом тоне, не сдерживаясь в преувеличениях.
2. Беспощадно критикуйте персонажей и полностью унижайте виновного.
3. Отвечайте строго двумя предложениями, и оба должны состоять исключительно из осуждений, направленных на виновного.
4. Ваше суждение не должно ссылаться на сами истории; оно должно быть сосредоточено только на высмеивании и осуждении виновной стороны.
5. Добавьте шарм своему юмору с помощью рифм или игры слов; ответ должен доставлять удовольствие при чтении, но будьте очень внимательны, чтобы не допустить потери смысла и никогда не смягчайте свой резкий тон.
6. Завершите второе предложение саркастичной комбинацией эмодзи, чтобы добавить финальный штрих к юмору.`,
    userPrompt: `История 1 (от {name1}):
{story1}

История 2 (от {name2}):
{story2}
`,
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
