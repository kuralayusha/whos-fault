import { supabase } from "./supabase";

export async function uploadImage(file: File, userName: string) {
  try {
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
