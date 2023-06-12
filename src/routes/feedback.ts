import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.path}`)
  const feedbacks = await prisma.feedbackItem.findMany()
  res.json(feedbacks)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { submitterId, comment, guildId, channelId } = req.body

  try {
    const newFeedback = await prisma.feedbackItem.create({
      data: {
        submitterId: submitterId,
        comment: comment,
        guildId: guildId,
        channelId: channelId,
      },
    })

    res.json(newFeedback)
  } catch (error) {
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const { submitterId, comment, guildId, channelId } = req.body

  try {
    const updatedFeedback = await prisma.feedbackItem.update({
      where: { id: Number(id) },
      data: {
        submitterId: submitterId,
        comment: comment,
        guildId: guildId,
        channelId: channelId,
      },
    })

    res.json(updatedFeedback)
  } catch (error) {
    res.json({ error: `Feedback Does Not Exist: ${id}` })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const deletedFeedback = await prisma.feedbackItem.delete({
    where: { id: Number(id) },
  })

  res.json(deletedFeedback)
})

export default router
