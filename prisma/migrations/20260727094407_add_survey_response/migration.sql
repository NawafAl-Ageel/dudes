-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favoriteItem" TEXT NOT NULL,
    "favoriteItemOther" TEXT,
    "singleBuyItem" TEXT NOT NULL,
    "singleBuyItemOther" TEXT,
    "purchaseFactor" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "idealAddition" TEXT,
    "missingFromMarket" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);
