import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsersThC = createAsyncThunk('fetch/users', async () => {
  const res = await axios.get('http://localhost:3005/users');

  //DEV ONLY
  const r = await pauseSuccess(1000);
  //const r = await pauseError(1000);
  console.log(r);

  return res.data;
});

//DEV ONLY Pause
function pauseSuccess(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('123');
    }, duration);
  });
}
function pauseError(duration: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error message');
    }, duration);
  });
}

export { fetchUsersThC };
