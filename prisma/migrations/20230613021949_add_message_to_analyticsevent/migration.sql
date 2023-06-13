/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `AnalyticsEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AnalyticsEvent" ADD COLUMN     "messageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsEvent_messageId_key" ON "AnalyticsEvent"("messageId");

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
