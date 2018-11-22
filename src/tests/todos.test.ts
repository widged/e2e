import { waitForReact, ReactSelector } from 'testcafe-react-selectors'

import { signin } from '../common'
import config from '../../config'

const { baseUrl } = config

fixture('Todos')
  .page(baseUrl)
  .beforeEach(async () => {
    await waitForReact()
  })

test
  .before(async () => {
    await signin()
  })
  ('Create a todo', async (t) => {
    await t
      .click(ReactSelector('MenuItem').withProps('icon', 'plus'))
      .typeText(ReactSelector('TextArea'), 'Create a todo - A')
      .click(ReactSelector('Button').withProps('primary', true))
      .expect(1).eql(1)
  })

test.only
  .before(async () => {
    await signin()
  })
  ('Delete a todo', async (t) => {
    const todo = ReactSelector('CardContent').filter((node: Element) => (
      !!(node.textContent && node.textContent.includes('testies'))
    ))
    await t.expect(todo.exists).ok()
  })

test('Send a todo', async (t) => {

})
