import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserThC, AppDispatch, fetchUsersThC, RootState } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';

type PropsT = {};

const UsersList: React.FC<any> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { usersEntities, isLoading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsersThC());
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

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between my-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}>+ Add User</Button>
      </div>
      {isLoading ? (
        <Skeleton times={10} className="h-10 w-full" />
      ) : (
        <div> {renderedUsers}</div>
      )}
    </div>
  );
};

export default UsersList;
