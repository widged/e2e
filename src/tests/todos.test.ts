import { t } from 'testcafe'
import { waitForReact, ReactSelector } from 'testcafe-react-selectors'

import { signin, createTestUser, deleteTestUser } from '../common'
import config from '../config'

const { baseUrl } = config

fixture('Todos')
  .page(baseUrl)
  .beforeEach(async () => {
    await createTestUser()
    await waitForReact()
    await signin()
  })
  .afterEach(async () => {
    await deleteTestUser()
  })

const createTodo = (message: string) => (
  t
    .click(ReactSelector('MenuItem').withProps('icon', 'plus'))
    .typeText(ReactSelector('TextArea'), message)
    .click(ReactSelector('Button').withProps('primary', true))
)

test('Correct "No todo" and "No history" messages displayed when appropriate', async (t) => {
  await t.expect(ReactSelector('TodosPage_TodosPage').textContent).contains('No todos')
  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  await t.expect(ReactSelector('HistoryPage_HistoryPage').textContent).contains('No history')
})

test('Create a todo', async (t) => {
  await createTodo('Buy some milk')
  let todos = ReactSelector('Card')
  await t.expect(todos.count).eql(1)
  await t.expect(todos.nth(0).textContent).contains('Buy some milk')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  let historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(1)
  await t.expect(historyItems.nth(0).textContent).contains('You created a new todo')
  let createdIcon = historyItems.nth(0).findReact('Icon').withProps('name', 'checkmark')
  await t.expect(createdIcon.exists).ok()

  await t.click(ReactSelector('MenuItem').withProps('name', 'todos'))
  await createTodo('Walk the dog')
  todos = ReactSelector('Card')
  await t.expect(todos.count).eql(2)
  await t.expect(todos.nth(1).textContent).contains('Walk the dog')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(2)
  await t.expect(historyItems.nth(0).textContent).contains('You created a new todo')
  createdIcon = historyItems.nth(0).findReact('Icon').withProps('name', 'checkmark')
  await t.expect(createdIcon.exists).ok()
})

// test('Delete a todo', async (t) => {
//   let todo = ReactSelector('CardContent').filter(node => (
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
