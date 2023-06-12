import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const guilds = await prisma.guilds.findMany()
  res.json(guilds)
})

router.get('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const guild = await prisma.guilds.findFirst({ where: { id: req.params.id } })
  res.json(guild)
})

router.get('/:id/members', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const members = await prisma.members.findMany({ where: { guildId: req.params.id } })
  res.json(members)
})

router.get('/:id/events', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const events = await prisma.analyticsEvent.findMany({ where: { guildId: req.params.id } })
  res.json(events)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const {
    id,
    name,
    description,
    joinedAt,
    discordCreatedAt,
    memberCount,
    cornScore,
    goodBotCount,
    badBotCount,
    icon,
  } = req.body

  try {
    const newGuild = await prisma.guilds.create({
      data: {
        id: id,
        name: name,
        description: description,
        joinedAt: joinedAt,
        discordCreatedAt: discordCreatedAt,
        memberCount: memberCount,
        cornScore: cornScore,
        goodBotCount: goodBotCount,
        badBotCount: badBotCount,
        icon: icon,
      },
    })

    res.json(newGuild)
  } catch (error) {
    res.status(409)
    res.json({ error: `Guild Already Exists: ${id}` })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params

  const {
    name,
    description,
    joinedAt,
    discordCreatedAt,
    memberCount,
    cornScore,
    goodBotCount,
    badBotCount,
    icon,
  } = req.body

  try {
    const guild = await prisma.guilds.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        joinedAt: joinedAt,
        discordCreatedAt: discordCreatedAt,
        memberCount: memberCount,
        cornScore: cornScore,
        goodBotCount: goodBotCount,
        badBotCount: badBotCount,
        icon: icon,
      },
    })

    res.json(guild)
  } catch (error) {
    res.status(404)
    res.json({ error: `Guild Does Not Exist: ${id}` })
  }
})

router.patch('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const updatedMember = await prisma.guilds.update({ where: { id: id }, data: req.body })

  res.json(updatedMember)
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const guild = await prisma.guilds.delete({
    where: { id: id },
  })

  res.json(guild)
})

export default router
