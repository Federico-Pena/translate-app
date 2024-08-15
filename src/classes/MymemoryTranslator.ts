import fs from 'fs'
import { BaseTranslator } from './BaseTranslator'

export class MymemoryTranslator extends BaseTranslator {
  readonly url: string
  readonly params: Record<string, string>

  constructor(to: string, from: string = 'auto') {
    super(to, from)
    this.url = this.configs.mymemory.url
    this.params = {
      langpair: `${this.from}|${this.to}`,
      q: ''
    }
  }

  async translateText(text: string): Promise<string> {
    this.params.q = text.trim()

    const response = await this.request(this.url, this.params)
    const data = JSON.parse(response)
    const translatedText = data.responseData.translatedText
    if (translatedText !== '' || translatedText !== undefined) {
      return translatedText
    }
    throw new Error(`No translation found for text: ${text}`)
  }

  async translateFile(
    filePath: string,
    readAsync: boolean = false
  ): Promise<string | string[]> {
    const text = readAsync
      ? await fs.promises.readFile(filePath, 'utf8')
      : fs.readFileSync(filePath, 'utf8')
    const data = await this.translateText(text)
    return data
  }
}
