import { describe, expect, test } from 'vitest'
import { apiConfig } from '../../src/config/apiConfig'
import supertest from 'supertest'
import app from '../../src/app/app'

const apiUrl = apiConfig.API_ROUTES.translate.translate
describe('translateController', () => {
  test('Shuold return a successful response with correct translation text.', async () => {
    const mockResponse = 'Text to translate'
    const response = await supertest(app)
      .post(apiUrl)
      .send({ text: 'Texto para traducir', fromLang: 'en', toLang: 'es' })
      .expect(200)
    expect(response.body).toEqual({
      data: mockResponse
    })
  })

  test('Shuold throw an TranslationError if fromLang is not supported', async () => {
    const response = await supertest(app)
      .post(apiUrl)
      .send({ text: 'text', fromLang: 'ess', toLang: 'es' })
      .expect(500)

    expect(response.body).toEqual({
      error: 'Error traduciendo el texto.'
    })
  })

  test('Shuold throw an TranslationError if toLang is not supported', async () => {
    const response = await supertest(app)
      .post(apiUrl)
      .send({ text: 'text', fromLang: 'es', toLang: 'esss' })
      .expect(500)

    expect(response.body).toEqual({
      error: 'Error traduciendo el texto.'
    })
  })

  test('Shuold throw an TranslationError if text is empty or > 5000 characters', async () => {
    const response = await supertest(app)
      .post(apiUrl)
      .send({ text: '', fromLang: 'es', toLang: 'en' })
      .expect(500)

    expect(response.body).toEqual({
      error: 'Error traduciendo el texto.'
    })
  })
})
