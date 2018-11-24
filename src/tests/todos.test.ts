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
    .click(ReactSelector('ModalActions Button').withProps('primary', true))
)

test('Correct "No todo" and "No history" messages displayed when appropriate', async (t) => {
  await t.expect(ReactSelector('TodosPage_TodosPage').textContent).contains('No todos')
  await t
    .click(ReactSelector('MenuItem').withProps('name', 'history'))
    .expect(ReactSelector('HistoryPage_HistoryPage').textContent).contains('No history')
})

test('Create a todo', async (t) => {
  await createTodo('Buy some milk')
  let todos = ReactSelector('Todo')
  await t.expect(todos.count).eql(1)
  await t.expect(todos.textContent).contains('Buy some milk')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  let historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(1)
  await t.expect(historyItems.nth(0).textContent).contains('You created a new todo')
  let createdIcon = historyItems.nth(0).findReact('Icon').withProps('name', 'checkmark')
  await t.expect(createdIcon.exists).ok()

  await t.click(ReactSelector('MenuItem').withProps('name', 'todos'))
  await createTodo('Walk the dog')
  todos = ReactSelector('Todo')
  await t.expect(todos.count).eql(2)
  await t.expect(todos.nth(1).textContent).contains('Walk the dog')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(2)
  await t.expect(historyItems.nth(0).textContent).contains('You created a new todo')
  createdIcon = historyItems.nth(0).findReact('Icon').withProps('name', 'checkmark')
  await t.expect(createdIcon.exists).ok()
})

test('Delete a todo', async (t) => {
  await createTodo('Clean the apartment')
  await t.expect(ReactSelector('Todo').count).eql(1)
  await t
    .click(ReactSelector('Todo DeleteTodoButton'))
    .click(ReactSelector('ModalActions Button').withProps('primary', true))
    .expect(ReactSelector('Todo').count).eql(0)
  await t.expect(ReactSelector('TodosPage_TodosPage').textContent).contains('No todos')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  const historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(2)
  await t.expect(historyItems.nth(0).textContent).contains('You deleted a todo')
  await t.expect(historyItems.nth(0).findReact('Icon').withProps('name', 'delete').exists).ok()
  await t.expect(historyItems.nth(1).textContent).contains('You created a new todo')
  await t.expect(historyItems.nth(1).findReact('Icon').withProps('name', 'checkmark').exists).ok()
})

test('Send a todo', async (t) => {
  await createTodo('Get a haircut')
  await t.expect(ReactSelector('Todo').count).eql(1)
  await t
    .click(ReactSelector('Todo SendTodoDropdown_SendTodoDropdown'))
    .click(ReactSelector('DropdownMenu DropdownItem').withProps('content', 'Han Solo'))
    .click(ReactSelector('ModalActions Button').withProps('primary', true))
    .expect(ReactSelector('Todo').count).eql(0)

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  let historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(2)
  await t.expect(historyItems.nth(0).textContent).contains('You sent a todo to Han Solo')
  await t.expect(historyItems.nth(0).findReact('Icon').withProps('name', 'send').exists).ok()
  await t.expect(historyItems.nth(1).textContent).contains('You created a new todo')
  await t.expect(historyItems.nth(1).findReact('Icon').withProps('name', 'checkmark').exists).ok()

  await t.click(ReactSelector('MenuItem').withProps('icon', 'sign-out'))
  await signin(`${t.ctx.username}_friend`)

  const todo = ReactSelector('Todo')
  await t.expect(todo.count).eql(1)
  await t.expect(todo.textContent).contains('Get a haircut')

  await t.click(ReactSelector('MenuItem').withProps('name', 'history'))
  historyItems = ReactSelector('HistoryItem')
  await t.expect(historyItems.count).eql(1)
  await t.expect(historyItems.textContent).contains('You received a todo from Luke Skywalker')
  await t.expect(historyItems.findReact('Icon').withProps('name', 'mail').exists).ok()
})
