import { login } from '../src/js/api/auth/login.js'
import { logout } from '../src/js/api/auth/logout.js'

globalThis.fetch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  localStorage.clear()
})

describe('Authentication functions', () => {
  describe('login test', () => {
    it('should store a token when provided with valid credentials', async () => {
      const email = 'test@example.com'
      const password = 'password123'
      const mockResponse = { accessToken: 'valid_token', name: 'Test User' }

      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      })

      const result = await login(email, password)

      expect(result).toEqual({ name: 'Test User' })
      expect(localStorage.getItem('token')).toEqual(
        JSON.stringify('valid_token')
      )
      expect(localStorage.getItem('profile')).toEqual(
        JSON.stringify({ name: 'Test User' })
      )
    })

    it('should throw an error when provided with invalid credentials', async () => {
      fetch.mockResolvedValueOnce({ ok: false, statusText: 'Unauthorized' })

      await expect(login('wrong@example.com', 'wrongPassword')).rejects.toThrow(
        'Unauthorized'
      )
    })
  })

  describe('logout test', () => {
    it('should clear the token and profile from localStorage', () => {
      localStorage.setItem('token', JSON.stringify('token_value'))
      localStorage.setItem('profile', JSON.stringify({ name: 'User' }))

      logout()

      expect(localStorage.getItem('token')).toBeNull()
      expect(localStorage.getItem('profile')).toBeNull()
    })
  })
})
