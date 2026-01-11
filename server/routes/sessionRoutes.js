
import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionByid, joinSession } from '../controllers/sessionController.js'

const sessionRoutes = express.Router()

sessionRoutes.post('/',protectRoute,createSession)
sessionRoutes.get('/active',protectRoute,getActiveSessions)
sessionRoutes.get('/my-recent',protectRoute,getMyRecentSessions)

sessionRoutes.get("/:id",protectRoute,getSessionByid)
sessionRoutes.post('/:id/join',protectRoute,joinSession)
sessionRoutes.post('/:id/end',protectRoute,endSession)



export default sessionRoutes




