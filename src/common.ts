import { t } from 'testcafe'
import { ReactSelector } from 'testcafe-react-selectors'

import {
  createTestUser as createTestUserApi,
  deleteTestUser as deleteTestUserApi,
} from './services/user'

export const signin = async (asFriend: boolean = false) => {
  const username = t.ctx.username + (asFriend ? '_friend' : '')
  return t
    .typeText(ReactSelector('Input').withProps('name', 'username'), username)
    .typeText(ReactSelector('Input').withProps('name', 'password'), 'password')
    .click(ReactSelector('Button').withProps('type', 'submit'))
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
