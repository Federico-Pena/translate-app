import path from 'node:path'
import express from 'express'
import cors from 'cors'
import { apiConfig } from '../config/apiConfig'
import { logger } from '../middlewares/logger'
import translate from '../routes/translate.routes'
import languages from '../routes/languages.routes'

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.use(cors(apiConfig.CORS_SETTINGS))

app.use(logger)

app.use(express.static(path.resolve('./public')))

app.use(translate)
app.use(languages)
app.use('*', express.static(path.resolve('./public')))
export default app
