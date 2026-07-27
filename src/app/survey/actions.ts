"use server";

import { prisma } from "@/lib/prisma";

export type SurveySubmission = {
  gender: string;
  favoriteItem: string;
  favoriteItemOther?: string;
  singleBuyItem: string;
  singleBuyItemOther?: string;
  purchaseFactor: string;
  priceRange: string;
  idealAddition?: string;
  missingFromMarket?: string;
  email?: string;
};

export async function submitSurvey(data: SurveySubmission) {
  if (
    !data.gender ||
    !data.favoriteItem ||
    !data.singleBuyItem ||
    !data.purchaseFactor ||
    !data.priceRange
  ) {
    throw new Error("Missing required fields");
  }

  await prisma.surveyResponse.create({
    data: {
      gender: data.gender,
      favoriteItem: data.favoriteItem,
      favoriteItemOther: data.favoriteItemOther || null,
      singleBuyItem: data.singleBuyItem,
      singleBuyItemOther: data.singleBuyItemOther || null,
      purchaseFactor: data.purchaseFactor,
      priceRange: data.priceRange,
      idealAddition: data.idealAddition || null,
      missingFromMarket: data.missingFromMarket || null,
      email: data.email || null,
    },
  });

  return { ok: true };
}
