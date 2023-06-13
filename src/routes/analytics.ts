import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 20
  const page = req.query.page ? parseInt(req.query.page as string) : 1

  const events = await prisma.analyticsEvent.findMany({
    include: { member: true, guild: true, message: true },
    skip: pageSize * (page - 1),
    take: pageSize,
  })
  res.json({
    page: page,
    pageSize: pageSize,
    pageCount: Math.ceil(events.length / pageSize),
    recordCount: events.length,
    data: events,
  })
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { type, event, guildId, channelId, memberId, messageId } = req.body
  console.log(req.body)

  try {
    const newEvent = await prisma.analyticsEvent.create({
      data: {
        type: type,
        event: event,
        guildId: guildId,
        channelId: channelId,
        memberId: memberId,
        messageId: messageId,
      },
    })
    console.log(newEvent)
    res.json(newEvent)
  } catch (error) {
    console.error(error)
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id } = req.params
  const { type, guildId, channelId, memberId, messageId } = req.body

  try {
    const updatedEvent = await prisma.analyticsEvent.update({
      where: { id: Number(id) },
      data: {
        type: type,
        guildId: guildId,
        channelId: channelId,
        memberId: memberId,
        messageId: messageId,
      },
    })

    res.json(updatedEvent)
  } catch (error) {
    res.json({ error: `Event Does Not Exist: ${id}` })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.originalUrl}`)
  const { id } = req.params
  const deletedEvent = await prisma.analyticsEvent.delete({
    where: { id: Number(id) },
  })

  res.json(deletedEvent)
})

export default router
