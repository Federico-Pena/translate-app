import { Request, Response } from 'express'
import TranslationError from '../errors/TranslationError'
import { GoogleTranslator } from '../classes/GoogleTranslator'
import { MymemoryTranslator } from '../classes/MymemoryTranslator'
import { languages } from '../data/languages'

const translateController = async (req: Request, res: Response) => {
  try {
    const { text, fromLang, toLang } = req.body

    isValidText(text)
    isLangSupported(fromLang)
    isLangSupported(toLang)
    const googleTranslator = new GoogleTranslator(toLang, fromLang)
    const textGoogle = await googleTranslator.translateText(text)
    if (textGoogle !== undefined && textGoogle !== text) {
      return res.status(200).json({ data: textGoogle })
    }

    const mymemoryTranslator = new MymemoryTranslator(toLang, fromLang)
    const textMymemory = await mymemoryTranslator.translateText(text)
    if (textMymemory !== undefined && textMymemory !== text) {
      return res.status(200).json({ data: textMymemory })
    }
    throw new TranslationError('Error traduciendo el texto.')
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'Error traduciendo el texto.' })
  }
}

const isValidText = (text: string): boolean => {
  const min = 1
  const max = 5000
  const length = text.trim().length
  if (length >= min && length <= max) {
    return true
  } else {
    throw new TranslationError(
      `The input text length must be between ${min} and ${max} characters.`
    )
  }
}

const isLangSupported = (lang: string): boolean => {
  const langExists = Object.keys(languages()).includes(lang) || lang === 'auto'
  if (langExists) {
    return true
  } else {
    throw new TranslationError(`${lang} is not a supported language.`)
  }
}

export default translateController
