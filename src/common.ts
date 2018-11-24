import { t } from 'testcafe'

import {
  createTestUser as createTestUserApi,
  deleteTestUser as deleteTestUserApi,
} from './services/user'

export const signin = async () => {
  return t
    .typeText('input[name="username"]', t.ctx.username)
    .typeText('input[name="password"]', 'password')
    .click('button[type="submit"]')
}

export const createTestUser = () => {
  let randomString = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 10; i += 1) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  t.ctx.username = `test_${randomString}`
  return createTestUserApi(t.ctx.username)
}

export const deleteTestUser = () =>
  deleteTestUserApi(t.ctx.username)
