import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Vibe Coding Template/)
  })

  test('should have sign in link', async ({ page }) => {
    await page.goto('/')
    const signInLink = page.getByRole('link', { name: /sign in/i })
    await expect(signInLink).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign In')
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe('Auth Pages', () => {
  test('login page should load', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
  })

  test('signup page should load', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.getByRole('heading', { name: /create an account/i })).toBeVisible()
  })
})
