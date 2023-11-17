// authStore.ts
import ky from 'ky'
import create from 'zustand'

interface User {
  id: number
  name: string
  email: string
  address: string
  password: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const localStorageKey = 'authData'

const useAuthStore = create<AuthState>((set) => {
  // Попытка загрузить данные из localStorage при инициализации
  const savedAuthData = localStorage.getItem(localStorageKey)
  const initialAuthData = savedAuthData
    ? JSON.parse(savedAuthData)
    : { user: null }

  return {
    ...initialAuthData,
    login: async (email, password) => {
      try {
        // Отправляем запрос на сервер для аутентификации
        const response = await ky
          .post('https://localhost:7056/api/User/Login', {
            json: { email, password },
          })
          .json()

        if (response) {
          set({ user: response })
          // Сохраняем данные в localStorage при успешной аутентификации
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ user: response })
          )
        } else {
          console.error('Неверные учетные данные')
        }
      } catch (error) {
        // Обработка ошибок
      }
    },
    logout: () => {
      set({ user: null })
      // Очищаем данные в localStorage при выходе из системы
      localStorage.removeItem(localStorageKey)
    },
  }
})

export default useAuthStore
