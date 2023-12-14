import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/types'
import type { RootState } from '../store'

// Define a type for the slice state
interface IUserState {
	user: IUser | null
	isAuth: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logOut: (state) => {
			state.user = null
			state.isAuth = false
		},
	},
})

export const { login, logOut } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user
export default userSlice.reducer
