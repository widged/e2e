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

export const randomString = (length: number = 10) => {
  let string = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i += 1) {
    string += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return string
}

export const createTestUser = () => {
  t.ctx.username = `test_${randomString()}`
  console.log('------------', t.ctx.username)
  return createTestUserApi(t.ctx.username)
}

export const deleteTestUser = () =>
  deleteTestUserApi(t.ctx.username)
