/*
  Warnings:

  - You are about to drop the column `boosterRole` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `comboRole` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `twitchRole` on the `Guilds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guilds" DROP COLUMN "boosterRole",
DROP COLUMN "comboRole",
DROP COLUMN "twitchRole";

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guildId" TEXT,
    "channelId" TEXT,
    "memberId" TEXT,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);
