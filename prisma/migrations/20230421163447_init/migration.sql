-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" SERIAL NOT NULL,
    "submitterId" TEXT,
    "comment" TEXT,
    "guildId" TEXT,
    "channelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guilds" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "joinedAt" TIMESTAMP(3),
    "discordCreatedAt" TIMESTAMP(3),
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "twitchRole" TEXT,
    "boosterRole" TEXT,
    "comboRole" TEXT,
    "cornScore" INTEGER NOT NULL DEFAULT 0,
    "goodBotCount" INTEGER NOT NULL DEFAULT 0,
    "badBotCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "displayHexColor" TEXT,
    "displayName" TEXT,
    "nickname" TEXT,
    "pending" BOOLEAN DEFAULT false,
    "premiumSince" TIMESTAMP(3),
    "guildId" TEXT,
    "pronouns" TEXT,
    "birthdayMonth" INTEGER,
    "birthdayDay" INTEGER,
    "birthdayPublic" BOOLEAN DEFAULT true,
    "joinedAt" TIMESTAMP(3),
    "corns" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReports" (
    "id" SERIAL NOT NULL,
    "reportedUserId" TEXT,
    "reason" TEXT,
    "reportedById" TEXT,
    "guildId" TEXT,
    "channelId" TEXT,
    "userSubmitted" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReports_pkey" PRIMARY KEY ("id")
);
