import { describe, expect, test } from 'vitest'
import { apiConfig } from '../../src/config/apiConfig'
import supertest from 'supertest'
import app from '../../src/app/app'
import { languages } from '../../src/data/languages'

describe('controllers/languagesController.ts', async () => {
  test('Should return a successful response with correct data.', async () => {
    const apiUrl = apiConfig.API_ROUTES.translate.languages
    const { body } = await supertest(app)
      .get(apiUrl)
      .expect(200)
      .expect('Content-Type', /json/)
    expect(body.data).toEqual(languages())
  })
})
