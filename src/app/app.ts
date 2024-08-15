import path from 'node:path'
import express from 'express'
import cors from 'cors'
import { apiConfig } from '../config/apiConfig'
import { logger } from '../middlewares/logger'
import translate from '../routes/translate.routes'
import languages from '../routes/languages.routes'

const app = express()

// Disable the header 'X-Powered-By'
app.disable('x-powered-by')

// Parse incoming JSON data.
app.use(express.json())

// Enable CORS
app.use(cors(apiConfig.CORS_SETTINGS))

// Log HTTP requests format.
app.use(logger)

// Serve static files.
app.use('/', express.static(path.resolve('./public')))

// Use one router
app.use(translate)
app.use(languages)
app.use('*', express.static(path.resolve('./public')))
export default app
