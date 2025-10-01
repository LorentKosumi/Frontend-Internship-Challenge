import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {state.value = action.payload},
        addUser: (state, action) => {
            state.value.unshift(action.payload)
        },
        deleteUser: (state, action) => {
            state.value = state.value.filter(user => user.id !== action.payload)
        },
        editUser: (state, action) => {
            const index  = state.value.findIndex(u => u.id === action.payload.id)
            if (index >= 0) state.value[index] = action.payload
        }

    }
})

export const { setUsers,addUser, deleteUser, editUser} = userSlice.actions
export default userSlice.reducer