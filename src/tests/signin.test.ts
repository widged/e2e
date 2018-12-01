import { ClientFunction } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'

import { signin, createTestUser, deleteTestUser } from '../common'
import config from '../config'

const { baseUrl } = config
const getLocation = ClientFunction(() => window.location.href)

fixture('Signin')
  .page(baseUrl)
  .beforeEach(async (t) => {
    await waitForReact()
  })

test('Login fails with "missing credentials" error message', async (t) => {
  await t
    .click(ReactSelector('Button').withProps('type', 'submit'))
    .expect(ReactSelector('MessageContent').textContent)
    .contains('Missing credentials')
})

test('Login fails with "unknown username" error message', async (t) => {
  await t
    .typeText(ReactSelector('Input').withProps('name', 'username'), 'XXXXXXXXXXXXX')
    .typeText(ReactSelector('Input').withProps('name', 'password'), 'XXXXXXXXXXXXX')
    .click(ReactSelector('Button').withProps('type', 'submit'))
    .expect(ReactSelector('MessageContent').textContent)
    .contains('Unknown username')
})

test
  .before(async () => {
    await createTestUser()
    await waitForReact()
  })
  ('Login fails with "incorrect password" error message', async (t) => {
    await t
      .typeText(ReactSelector('Input').withProps('name', 'username'), t.ctx.username)
      .typeText(ReactSelector('Input').withProps('name', 'password'), 'XXXXXXXXXXXXX')
      .click(ReactSelector('Button').withProps('type', 'submit'))
      .expect(ReactSelector('MessageContent').textContent)
      .contains('Incorrect password')
  })
  .after(async () => {
    await deleteTestUser()
  })

test
  .before(async () => {
    await createTestUser()
    await waitForReact()
    await signin()
  })
  ('Login successful and uses corresponding user data', async (t) => {
    await t
      .expect(getLocation())
      .eql(`${baseUrl}/home/todos`)
      .expect(ReactSelector('Image').withProps('avatar', true).getAttribute('src'))
      .eql('https://i.imgur.com/gwy9tVn.png')
  })
  .after(async () => {
    await deleteTestUser()
  })

test
  .before(async () => {
    await createTestUser()
    await waitForReact()
    await signin()
  })
  ('When signed in allow access to protected routes', async (t) => {
    await t
      .expect(getLocation())
      .eql(`${baseUrl}/home/todos`)
    await t.eval(() => location.reload(true))
    await t
      .expect(getLocation())
      .eql(`${baseUrl}/home/todos`)
  })
  .after(async () => {
    await deleteTestUser()
  })

test('When not signed in don\'t allow access to protected routes', async (t) => {
  await t.eval(() => localStorage.clear())
  await t
    .navigateTo(`${baseUrl}/home/todos`)
    .expect(getLocation())
    .eql(`${baseUrl}/signin`)
})

test
  .before(async () => {
    await createTestUser()
    await waitForReact()
    await signin()
  })
  ('Able to signout successfully', async (t) => {
    await t.click(ReactSelector('Icon').withProps('name', 'sign-out'))
    const token = t.eval(() => localStorage.getItem('token'))
    await t
      .expect(token)
      .eql(null)
    await t
      .expect(getLocation())
      .eql(`${baseUrl}/signin`)
  })
  .after(async () => {
    await deleteTestUser()
  })
