import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import translateController from '../controllers/translateController'

const translate = Router()

const { translate: translateRoute } = apiConfig.API_ROUTES.translate

translate.post(translateRoute, translateController)

export default translate
