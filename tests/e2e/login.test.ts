import { expect, test } from '@nuxt/test-utils/playwright'

test.setTimeout(120000)
test('it should load login page', async ({ page, goto }) => {
  await goto('/iniciar-sesion', { waitUntil: 'hydration' })
  await expect(page.getByRole('button', { disabled: true })).toHaveText('Iniciar sesión')
})
