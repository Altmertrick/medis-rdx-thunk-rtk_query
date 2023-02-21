import { GoTrashcan } from 'react-icons/go';
import { useThunk } from '../hooks/use-thunk';
import { removeUserThC, UserT } from '../store';

import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

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

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
