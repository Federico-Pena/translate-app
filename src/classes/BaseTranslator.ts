import TranslationError from '../errors/TranslationError'

interface TranslatorConfig {
  url: string
  pattern?: string
  key: string
}

export class BaseTranslator {
  protected to: string
  protected from: string
  protected configs: { [key: string]: TranslatorConfig }

  constructor(to: string, from: string = 'auto') {
    this.to = to
    this.from = from

    this.configs = {
      google: {
        url: 'https://translate.google.com/m?',
        pattern: 'class="result-container">',
        key: 'q'
      },
      mymemory: {
        url: 'http://api.mymemory.translated.net/get',
        key: 'q'
      }
    }
  }

  protected async request(
    url: string,
    params: Record<string, string>
  ): Promise<any> {
    try {
      const query = new URLSearchParams(params).toString()
      const response = await fetch(`${url}?${query}`)
      if (!response.ok) {
        throw new TranslationError(
          'HTTP Error occurred while requesting the translation.',
          response.status
        )
      }
      const data = await response.text()
      return data
    } catch (error: any) {
      if (error instanceof TranslationError) {
        throw error
      } else {
        console.error(error)
        throw new TranslationError(
          'Error occurred while requesting the translation.',
          500
        )
      }
    }
  }
}
