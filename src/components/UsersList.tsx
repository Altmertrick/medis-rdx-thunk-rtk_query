import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThC, AppDispatch, fetchUsersThC, RootState } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

type PropsT = {};

const UsersList: React.FC<any> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState<any>(null);

  const { usersEntities } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      try {
        await dispatch(fetchUsersThC()).unwrap();
        //setIsLoadingUsers(false);
      } catch (error) {
        setLoadingUsersError(error);
        //setIsLoadingUsers(false);
      } finally {
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    dispatch(addUserThC());
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

  if (loadingUsersError) {
    return (
      <div>
        <p>{loadingUsersError.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between my-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}>+ Add User</Button>
      </div>

      {isLoadingUsers ? (
        <Skeleton times={10} className="h-10 w-full" />
      ) : (
        <div> {renderedUsers}</div>
      )}
    </div>
  );
};

export default UsersList;
