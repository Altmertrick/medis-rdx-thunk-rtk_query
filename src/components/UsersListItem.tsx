import { GoTrashcan } from 'react-icons/go';
import { useThunk } from '../hooks/use-thunk';
import { removeUserThC } from '../store';
import { UserT } from '../store/slices/usersSlice';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

interface PropsT {
  user: UserT;
}

const UsersListItem: React.FC<PropsT> = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUserThC);

  const handleRemoveUser = (user: any) => {
    doRemoveUser(user);
  };

  const header = (
    <>
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
    </>
  );

  return <ExpandablePanel header={header}>Content!!!</ExpandablePanel>;
};

export default UsersListItem;
