import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchUsersThC } from '../thunks/fetchUsers';

type UserT = {
  id: string;
  name: string;
};
interface UsersState {
  usersEntities: Array<UserT>;
  isLoading: boolean;
  error: null | SerializedError;
}
const initialState = {
  usersEntities: [],
  isLoading: false,
  error: null,
} as UsersState;

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action) {
      state.usersEntities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThC.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThC.fulfilled, (state, action) => {
      state.usersEntities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUsersThC.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
