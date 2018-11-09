import { Selector, ClientFunction } from 'testcafe'

const getLocation = ClientFunction(() => document.location.href)

fixture `Getting Started`
  .page `http://ec2-35-176-98-221.eu-west-2.compute.amazonaws.com`

test('Login fails with appropriate message', async (t) => {
  await t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'pugz_rule')
    .click('button[type="submit"]')
    .expect(getLocation())
    .contains('http://ec2-35-176-98-221.eu-west-2.compute.amazonaws.com/home/todos')
})
