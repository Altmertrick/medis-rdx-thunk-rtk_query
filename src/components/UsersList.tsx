import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addUserThC, fetchUsersThC, RootState } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/use-thunk';
import { UserT } from '../store/slices/usersSlice';
import UsersListItem from './UsersListItem';

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

  let content;

  if (isLoadingFetchUsers) {
    content = <Skeleton times={10} className="h-10 w-full" />;
  } else if (errorFetchUsers) {
    content = (
      <div>
        <p>Error: {errorFetchUsers.message}</p>
      </div>
    );
  } else {
    content = usersEntities.map((user) => {
      return <UsersListItem user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center my-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isLoadingAddUser} onClick={handleAddUser}>
          + Add User
        </Button>
      </div>
      {addUserError && (
        <div>Error while adding a user: {addUserError.message}</div>
      )}
      {content}
    </div>
  );
};

export default UsersList;
