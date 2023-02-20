import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pauseSuccess, pauseError } from '../../utils/pause';

const fetchUsersThC = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get('http://localhost:3005/users', {
    params: {
      _page: 1,
      _limit: 10,
    },
  });
  //const totalCount = res.headers['x-total-count']

  //DEV ONLY
  const r = await pauseSuccess(1000);
  //const r = await pauseError(1000);
  console.log(r);

  return res.data;
});

export { fetchUsersThC };
