import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const members = await prisma.member.findMany()
  res.json(members)
})

router.get('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const member = await prisma.member.findFirst({ where: { id: req.params.id } })
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
    const newMember = await prisma.member.create({
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
    corns,
  } = req.body

  try {
    const updatedMember = await prisma.member.update({
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
  const updatedMember = await prisma.member.update({ where: { id: id }, data: req.body })

  res.json(updatedMember)
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const deletedMember = await prisma.member.delete({
    where: { id: id },
  })

  res.json(deletedMember)
})

export default router
