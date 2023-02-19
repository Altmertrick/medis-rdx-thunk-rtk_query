import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { fetchUsersThC } from '../thunks/fetchUsers';
import { addUserThC } from '../thunks/addUser';

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
  currentPage: 1,
  pageSize: 5,
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
    //Fetch users
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
    //Add user
    builder.addCase(addUserThC.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUserThC.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersEntities.push(action.payload);
    });
    builder.addCase(addUserThC.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = userSlice.reducer;
