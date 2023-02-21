import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { fetchUsersThC } from '../thunks/fetchUsers';
import { addUserThC } from '../thunks/addUser';
import { removeUserThC } from '../thunks/removeUser';
import { UserT } from '../index';

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
  reducers: {},

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
    builder.addCase(
      addUserThC.fulfilled,
      (state, action: PayloadAction<UserT>) => {
        state.isLoading = false;
        state.usersEntities.push(action.payload);
      }
    );
    builder.addCase(addUserThC.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //Remove User
    builder.addCase(removeUserThC.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      removeUserThC.fulfilled,
      (state, action: PayloadAction<UserT>) => {
        state.usersEntities = state.usersEntities.filter(
          (user) => user.id !== action.payload.id
        );
        state.isLoading = false;
      }
    );
    builder.addCase(removeUserThC.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const usersReducer = userSlice.reducer;
