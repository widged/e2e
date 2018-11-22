import { t } from 'testcafe'

export const signin = async () => (
  t
    .typeText('input[name="username"]', 'mike86')
    .typeText('input[name="password"]', 'pugz_rule')
    .click('button[type="submit"]')
)
