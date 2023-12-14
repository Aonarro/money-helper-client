import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper'
import { router } from './router/Router'
import { AuthService } from './services/auth.service'
import { useAppDispatch } from './store/hooks'
import { logOut, login } from './store/slices/userSlice'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage()
		try {
			if (token) {
				const data = await AuthService.getProfile()

				if (data) {
					dispatch(login(data))
				} else {
					dispatch(logOut())
				}
			}
		} catch (error: any) {
			toast.error(error.toString())
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return <RouterProvider router={router} />
}

export default App
