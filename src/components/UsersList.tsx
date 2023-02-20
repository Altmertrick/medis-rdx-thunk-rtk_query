import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThC, AppDispatch, fetchUsersThC, RootState } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { AsyncThunk } from '@reduxjs/toolkit';

const useThunk = (thunk: AsyncThunk<any, void, any>) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const runThunk = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(thunk()).unwrap();
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error] as const;
};

type PropsT = {};

const UsersList: React.FC<any> = (props) => {
  const [doFetchUsers, isLoadingFetchUsers, errorFetchUsers] =
    useThunk(fetchUsersThC);
  const [doAddUser, isLoadingAddUser, addUserError] = useThunk(addUserThC);

  const { usersEntities } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUser();
  };

  const renderedUsers = usersEntities.map((user) => {
    return (
      <div key={user.id} className="mb border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  if (errorFetchUsers) {
    return (
      <div>
        <p>{errorFetchUsers.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between my-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isLoadingAddUser ? (
          <span>loading...</span>
        ) : (
          <Button disabled={isLoadingAddUser} onClick={handleAddUser}>
            + Add User
          </Button>
        )}
      </div>

      {addUserError && (
        <div>Error while adding a user: {addUserError.message}</div>
      )}

      {isLoadingFetchUsers ? (
        <Skeleton times={10} className="h-10 w-full" />
      ) : (
        <div> {renderedUsers}</div>
      )}
    </div>
  );
};

export default UsersList;
