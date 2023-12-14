import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { AuthService } from '../services/auth.service'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/userSlice'

export const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	//Registration
	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			console.log(data)
			if (data) {
				navigate('/')
				toast.success('Account has been created')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}
	//Login
	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })

			console.log(data)
			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('Welcome!')
				navigate('/')
			}
		} catch (err: any) {
			const error = err.response?.data.message
			toast.error(error.toString())
		}
	}

	return (
		<div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-10">
				{isLogin ? 'Login' : 'Regisration'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="flex w-1/3 flex-col mx-auto gap-5"
			>
				<input
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					type="text"
					className="input"
					placeholder="Email..."
				/>
				<input
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type="password"
					className="input"
					placeholder="Password..."
				/>

				<button className="btn btn-green mx-auto">Submit</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You don`t have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
