import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const members = await prisma.members.findMany()
  res.json(members)
})

router.get('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const member = await prisma.members.findFirst({ where: { id: req.params.id } })
  res.json(member)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const {
    id,
    name,
    avatar,
    displayHexColor,
    displayName,
    nickname,
    pending,
    premiumSince,
    guildId,
    joinedAt,
  } = req.body

  try {
    const newMember = await prisma.members.create({
      data: {
        id: id,
        name: name,
        avatar: avatar,
        displayHexColor: displayHexColor,
        displayName: displayName,
        nickname: nickname,
        pending: pending,
        premiumSince: premiumSince,
        guildId: guildId,
        joinedAt: joinedAt,
      },
    })

    res.json(newMember)
  } catch (error) {
    res.status(409)
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params

  const {
    name,
    avatar,
    displayHexColor,
    displayName,
    nickname,
    pending,
    premiumSince,
    guildId,
    joinedAt,
    pronouns,
    birthdayMonth,
    birthdayDay,
    birthdayPublic,
    corns,
  } = req.body

  try {
    const updatedMember = await prisma.members.update({
      where: { id: id },
      data: {
        name: name,
        avatar: avatar,
        displayHexColor: displayHexColor,
        displayName: displayName,
        nickname: nickname,
        pending: pending,
        premiumSince: premiumSince,
        guildId: guildId,
        joinedAt: joinedAt,
        pronouns: pronouns,
        birthdayMonth: birthdayMonth,
        birthdayDay: birthdayDay,
        birthdayPublic: birthdayPublic,
        corns,
      },
    })
    res.json(updatedMember)
  } catch (error) {
    res.status(404)
    res.json({ error: error })
  }
})

router.patch('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const updatedMember = await prisma.members.update({ where: { id: id }, data: req.body })

  res.json(updatedMember)
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const deletedMember = await prisma.members.delete({
    where: { id: id },
  })

  res.json(deletedMember)
})

export default router
