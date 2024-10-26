import { createSlice } from '@reduxjs/toolkit';

// Selector untuk mengambil users dari state
const selectUsers = (state) => state.user.users || []; // Memastikan users tidak undefined

// State awal untuk slice user
const initialState = {
    users: [],
};

// Membuat slice untuk user
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllUser(state, action) {
            state.users = action.payload; // Mengatur semua users
        },
        clearUsers(state) {
            state.users = []; // Menghapus semua users
        }
    }
});

// Mengekspor actions untuk digunakan di komponen
export const { setAllUser, clearUsers } = userSlice.actions;

// Mengekspor reducer untuk digunakan di store
export default userSlice.reducer;
