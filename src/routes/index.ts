import { Router } from 'express'
import guilds from './guilds'
import members from './members'
import feedbacks from './feedback'
import reports from './reports'
import analytics from './analytics'

/**
 * All top-level routes should be applied to the router here.
 * If routes are nested (i.e. /route1/route2) then they should have
 * their own folder for each nested level.
 * Each nested folder should have an index.ts file that applies the routes within
 * that folder to it's own router.
 */
const router = Router()
router.use('/guilds', guilds)
router.use('/members', members)
router.use('/feedbacks', feedbacks)
router.use('/reports', reports)
router.use('/analytics', analytics)

export default router
