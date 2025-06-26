// store/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { UserT } from '@/types/types';


export interface AuthState {
    token: string | null;
    user: UserT | null;
    isAuthenticated: boolean;
}
const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            if (!token || token.length <= 0) return;
            state.user = user;
            state.isAuthenticated = true;
            // Store in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },

        updateToken: (state, action) => {
            const token = action.payload;
            if (!token || token.length <= 0) return;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
        },

        updateUser: (state, action) => {
            const user = action.payload;
            state.user = user;
            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(user));
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        // Hydrate auth state from localStorage on app load
        hydrate: (state) => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            state.token = token;
            state.user = user && JSON.parse(user);
            state.isAuthenticated = !!(token && user);
        },
    },
});


export const { setCredentials, logout, hydrate, updateToken, updateUser } = authSlice.actions;
export default authSlice.reducer;