"use server";

import {
  supabase,
  FiftyFiftyBlameResult,
  NumberGuessBlameResult,
} from "./supabase";

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
