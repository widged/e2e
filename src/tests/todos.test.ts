// import { t } from 'testcafe'
// import { waitForReact, ReactSelector } from 'testcafe-react-selectors'
//
// import { signin, createTestUser, deleteTestUser } from '../common'
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
// const getTodoWithMessage = (message: string) => (
//   ReactSelector('CardContent').filter((node: Element) => (
//     !!(node.textContent && node.textContent.includes(message))
//   ))
// )
//
// fixture('Todos')
//   .page(baseUrl)
//   .beforeEach(async () => {
//     await createTestUser()
//     await waitForReact()
//     await signin()
//   })
//   .afterEach(async () => {
//     await deleteTestUser()
//   })
//
// test('Create a todo', async (t) => {
//   await t
//     .click(ReactSelector('MenuItem').withProps('icon', 'plus'))
//     .typeText(ReactSelector('TextArea'), 'Create a todo - A')
//     .click(ReactSelector('Button').withProps('primary', true))
//     .expect(1).eql(1)
// })
//
// test('Delete a todo', async (t) => {
//   let todo = ReactSelector('CardContent').filter((node: Element) => (
//     !!(node.textContent && node.textContent.includes('testies'))
//   ))
//   await t.expect(todo.exists).ok()
//   await t
//     .click(todo.findReact('Button').withProps('icon', 'close'))
//     .click(ReactSelector('Button').withProps('primary', true))
//   todo = ReactSelector('CardContent').filter((node: Element) => (
//     !!(node.textContent && node.textContent.includes('testies'))
//   ))
//   await t.expect(todo.exists).notOk()
// })
//
// test('Send a todo', async (t) => {
//
// })
