import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pauseSuccess, pauseError } from '../../utils/pause';
import { UserT } from '../index';

const removeUserThC = createAsyncThunk('users/remove', async (user: UserT) => {
  const res = await axios.delete(`http://localhost:3005/users/${user.id}`);
  await pauseSuccess(500);
  return user;
});

export { removeUserThC };
