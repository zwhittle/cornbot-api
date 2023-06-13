import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const messages = await prisma.message.findMany()
  res.json(messages)
})

router.get('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id } = req.params
  const messages = await prisma.message.findMany({ where: { id: id } })
  res.json(messages)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id, authorId, guildId, channelId, content, discordCreatedAt, editable, url } = req.body
  console.log(req.body)

  try {
    const newMessage = await prisma.message.create({
      data: {
        id: id,
        authorId: authorId,
        guildId: guildId,
        channelId: channelId,
        content: content,
        discordCreatedAt: discordCreatedAt,
        editable: editable,
        url: url,
      },
    })
    console.log(newMessage)
    res.json(newMessage)
  } catch (error) {
    console.error(error)
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id } = req.params
  const { authorId, guildId, channelId, content, discordCreatedAt, editable, url } = req.body

  try {
    const updatedMember = await prisma.message.update({
      where: { id: id },
      data: {
        authorId: authorId,
        guildId: guildId,
        channelId: channelId,
        content: content,
        discordCreatedAt: discordCreatedAt,
        editable: editable,
        url: url,
      },
    })

    res.json(updatedMember)
  } catch (error) {
    res.json({ error: `Member Does Not Exist: ${id}` })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id } = req.params
  const deletedMember = await prisma.message.delete({
    where: { id: id },
  })

  res.json(deletedMember)
})

export default router
