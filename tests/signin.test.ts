import { Selector, ClientFunction } from 'testcafe'
import { waitForReact } from 'testcafe-react-selectors'
import { ReactSelector } from 'testcafe-react-selectors'

import config from '../config'

const { baseUrl } = config
const getLocation = ClientFunction(() => window.location.href)

fixture('Getting Started')
  .page(baseUrl)
  .beforeEach(async () => {
    await waitForReact()
  })

test('Login fails with "missing credentials" error message', async (t) => {
  await t
    .click('button[type="submit"]')
    .expect(Selector('.ui.error.message p').textContent)
    .eql('Missing credentials')
})

test('Login fails with "unknown username" error message', async (t) => {
  await t
    .typeText('input[name="username"]', 'this user doesnt exist')
    .typeText('input[name="password"]', 'password')
    .click('button[type="submit"]')
    .expect(Selector('.ui.error.message p').textContent)
    .eql('Unknown username')
})

test('Login fails with "incorrect password" error message', async (t) => {
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'incorrect password')
    .click('button[type="submit"]')
    .expect(Selector('.ui.error.message p').textContent)
    .eql('Incorrect password')
})

test('Login successful and uses corresponding user data', async (t) => {
  // -------------- MAKE THIS REUSABLE --------------
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'pugz_rule')
    .click('button[type="submit"]')
  // ------------------------------------------------

  await t
    .expect(getLocation())
    .eql(`${baseUrl}/home/todos`)
    .expect(Selector('img.ui.avatar.image').getAttribute('src'))
    .eql('https://www.deshdoot.com/wp-content/uploads/2018/06/user.png')
})

test('When signed in allow access to protected routes', async (t) => {
  // MAKE THIS REUSABLE
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'pugz_rule')
    .click('button[type="submit"]')
  // ------------------------------------------------

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

test('Able to signout successfully', async (t) => {
  // -------------- MAKE THIS REUSABLE --------------
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'pugz_rule')
    .click('button[type="submit"]')
  // ------------------------------------------------

  await t.click(Selector('.item > .sign-out'))

  const token = t.eval(() => localStorage.getItem('token'))

  await t
    .expect(token)
    .eql(null)

  await t
    .expect(getLocation())
    .eql(`${baseUrl}/signin`)
})
