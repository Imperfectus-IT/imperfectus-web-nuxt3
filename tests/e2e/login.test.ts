import { expect, test } from '@nuxt/test-utils/playwright'

test.setTimeout(120000)
test('it should load login page', async ({ page, goto }) => {
  await goto('/iniciar-sesion', { waitUntil: 'hydration' })
  await expect(page.getByRole('button', { disabled: true })).toHaveText('Iniciar sesión')
})

test('it should login a user successfully', async ({ page, goto }) => {
  await goto('/iniciar-sesion', { waitUntil: 'hydration' })
  await page.locator('#identifier').click()
  await page.locator('#identifier').fill('usertest@demo.com')
  await page.locator('#password').click()
  await page.locator('#password').fill('usertest')
  await page.getByRole('button', { name: /submit/i, exact: true }).click()
  await expect(page).toHaveURL('/mi-cuenta')
})
