import express from 'express'

import { log } from '../../middlewares/logger.middleware.js'
import { getReviews } from '../game/game.controller.js'

export const reviewRoutes = express.Router()

reviewRoutes.get('/', log, getReviews)
