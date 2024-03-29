import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = ''
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = '';
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(channelId => channelId === action.payload), 1);
            }else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, subscription} = userSlice.actions;
export default userSlice.reducer;