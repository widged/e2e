// import { t } from 'testcafe'
// import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
//
// import { signin } from '../common'
// import config from '../config'
//
// const { baseUrl } = config
//
// const createTodo = (message: string) => (
//   t
//     .click(ReactSelector('MenuItem').withProps('icon', 'plus'))
//     .typeText(ReactSelector('TextArea'), message)
//     .click(ReactSelector('Button').withProps('primary', true))
// )
//
// fixture('Todos')
//   .page(baseUrl)
//   .beforeEach(async () => {
//     await waitForReact()
//   })
//
// test
//   .before(async () => {
//     await signin()
//   })
//   ('Create a todo', async (t) => {
//     await t
//       .click(ReactSelector('MenuItem').withProps('icon', 'plus'))
//       .typeText(ReactSelector('TextArea'), 'Create a todo - A')
//       .click(ReactSelector('Button').withProps('primary', true))
//       .expect(1).eql(1)
//   })
//
// test.only
//   .before(async () => {
//     await signin()
//   })
//   ('Delete a todo', async (t) => {
//     let todo = ReactSelector('CardContent').filter((node: Element) => (
//       !!(node.textContent && node.textContent.includes('testies'))
//     ))
//     await t.expect(todo.exists).ok()
//     await t
//       .click(todo.findReact('Button').withProps('icon', 'close'))
//       .click(ReactSelector('Button').withProps('primary', true))
//     todo = ReactSelector('CardContent').filter((node: Element) => (
//       !!(node.textContent && node.textContent.includes('testies'))
//     ))
//     await t.expect(todo.exists).notOk()
//   })
//
// test('Send a todo', async (t) => {
//
// })
