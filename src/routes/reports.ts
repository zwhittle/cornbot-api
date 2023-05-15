import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const reports = await prisma.userReports.findMany()
  res.json(reports)
})

router.post('/', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { reportedUserId, reason, reportedById, guildId, channelId, userSubmitted } = req.body

  try {
    const newReport = await prisma.userReports.create({
      data: {
        reportedUserId: reportedUserId,
        reason: reason,
        reportedById: reportedById,
        guildId: guildId,
        channelId: channelId,
        userSubmitted: userSubmitted,
      },
    })

    res.json(newReport)
  } catch (error) {
    res.json({ error: error })
  }
})

router.put('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const { reportedUserId, reason, reportedById, guildId, channelId, userSubmitted } = req.body

  try {
    const updatedReport = await prisma.userReports.update({
      where: { id: Number(id) },
      data: {
        reportedUserId: reportedUserId,
        reason: reason,
        reportedById: reportedById,
        guildId: guildId,
        channelId: channelId,
        userSubmitted: userSubmitted,
      },
    })

    res.json(updatedReport)
  } catch (error) {
    res.json({ error: `Report Does Not Exist: ${id}` })
  }
})

router.delete('/:id', async (req, res) => {
  console.log(`${req.method}: ${req.url}`)
  const { id } = req.params
  const deletedReport = await prisma.userReports.delete({
    where: { id: Number(id) },
  })

  res.json(deletedReport)
})

export default router
