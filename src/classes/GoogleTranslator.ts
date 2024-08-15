import fs from 'fs'
import { BaseTranslator } from './BaseTranslator'

export class GoogleTranslator extends BaseTranslator {
  readonly url: string
  readonly params: Record<string, string>

  constructor(to: string, from: string = 'auto') {
    super(to, from)
    this.url = this.configs.google.url
    this.params = {
      sl: this.from,
      hl: this.to,
      q: ''
    }
  }

  async translateText(text: string): Promise<string> {
    this.params.q = text.trim()

    const html = await this.request(this.url, this.params)

    const pattern = this.configs.google.pattern
    if (pattern === undefined) {
      throw new Error('Pattern is undefined')
    }
    const searchIndex = html.search(pattern)
    if (searchIndex === -1) {
      throw new Error('Pattern not found in the HTML response')
    }
    const idx = Number(searchIndex) + pattern.length

    const body: string = html.slice(idx)
    const translated = body.substring(0, body.indexOf('<'))

    if (translated === '') {
      throw new Error(`No translation found for text: ${text}`)
    }
    return translated
  }

  async translateFile(
    filePath: string,
    readAsync: boolean = false
  ): Promise<string | Error> {
    const text = readAsync
      ? await fs.promises.readFile(filePath, 'utf8')
      : fs.readFileSync(filePath, 'utf8')
    const data = await this.translateText(text)
    return data
  }
}
