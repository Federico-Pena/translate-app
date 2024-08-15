import { Request, Response } from 'express'
import { languages } from '../data/languages'
import TranslationError from '../errors/TranslationError'

export const languagesController = async (req: Request, res: Response) => {
  try {
    const supportedLanguages = languages()
    if (supportedLanguages === undefined || supportedLanguages === null) {
      throw new TranslationError('Lenguajes no disponibles.', 500)
    }
    res.status(200).json({ data: supportedLanguages })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los idiomas.' })
  }
}
