import { GoTrashcan } from 'react-icons/go';
import { useThunk } from '../hooks/use-thunk';
import { removeUserThC } from '../store';
import { UserT } from '../store/slices/usersSlice';
import Button from './Button';

interface PropsT {
  user: UserT;
}

const UsersListItem: React.FC<PropsT> = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUserThC);

  const handleRemoveUser = (user: any) => {
    doRemoveUser(user);
  };

  return (
    <div key={user.id} className="mb border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex justify-between items-center ">
          <Button
            className="mr-2"
            loading={isLoading}
            onClick={() => {
              handleRemoveUser(user);
            }}
          >
            <GoTrashcan />
          </Button>
          {user.name}
          {error && <div>Error while deleting user! </div>}
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
