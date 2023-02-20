import { faker } from '@faker-js/faker';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pauseSuccess } from '../../utils/pause';

const addUserThC = createAsyncThunk('users/add', async () => {
  const res = await axios.post('http://localhost:3005/users', {
    name: faker.name.fullName(),
  });

  await pauseSuccess(1000);

  return res.data;
});

export { addUserThC };
