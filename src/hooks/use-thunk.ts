import { AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

//T - type of thunks arguments

function useThunk<T>(thunk: AsyncThunk<any, T, any>) {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const runThunk = useCallback(
    async (arg: T) => {
      setIsLoading(true);
      try {
        await dispatch(thunk(arg)).unwrap();
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error] as const;
}

export { useThunk };
