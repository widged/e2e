import { ClientFunction } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'

import { signin } from '../common'
import config from '../../config'

const { baseUrl } = config
const getLocation = ClientFunction(() => window.location.href)

fixture('Signin')
  .page(baseUrl)
  .beforeEach(async () => {
    await waitForReact()
  })

test('Login fails with "missing credentials" error message', async (t) => {
  await t
    .click('button[type="submit"]')
    .expect(ReactSelector('MessageContent').textContent)
    .contains('Missing credentials')
})

test('Login fails with "unknown username" error message', async (t) => {
  await t
    .typeText('input[name="username"]', 'this user doesnt exist')
    .typeText('input[name="password"]', 'password')
    .click('button[type="submit"]')
    .expect(ReactSelector('MessageContent').textContent)
    .contains('Unknown username')
})

test('Login fails with "incorrect password" error message', async (t) => {
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'incorrect password')
    .click('button[type="submit"]')
    .expect(ReactSelector('MessageContent').textContent)
    .contains('Incorrect password')
})

test
  .before(async () => {
    await signin()
  })
  ('Login successful and uses corresponding user data', async (t) => {
    await t
      .expect(getLocation())
      .eql(`${baseUrl}/home/todos`)
      .expect(ReactSelector('Image').withProps('avatar', true).getAttribute('src'))
      .eql('https://www.deshdoot.com/wp-content/uploads/2018/06/user.png')
  })

test
  .before(async () => {
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

test('When not signed in don\'t allow access to protected routes', async (t) => {
  await t.eval(() => localStorage.clear())
  await t
    .navigateTo(`${baseUrl}/home/todos`)
    .expect(getLocation())
    .eql(`${baseUrl}/signin`)
})

test
  .before(async () => {
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
