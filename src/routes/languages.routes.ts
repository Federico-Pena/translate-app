import { Router } from 'express'
import { apiConfig } from '../config/apiConfig'
import { languagesController } from '../controllers/languagesController'

const languages = Router()

const { languages: lang } = apiConfig.API_ROUTES.translate

languages.get(lang, languagesController)

export default languages
