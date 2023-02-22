import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { UserT } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import classNames from 'classnames';

type PropsT = {
  user: UserT;
};

const AlbumsList: React.FC<PropsT> = ({ user }) => {
  const { data, error, isLoading, isFetching, refetch } =
    useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = async (user: UserT) => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={2} className="h-10 w-full" />;
  } else if (error) {
    //  as hook returns error of type FetchBaseQueryError | SerializedError | undefined
    // we need to narrow down its type to safely access its props
    //see docs rtk-query/usage-with-typescript#type-safe-error-handling
    if ('status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      content = (
        <div>
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        </div>
      );
    } else {
      content = <div>{error.message}</div>;
    }
  } else {
    content = data?.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          Photos content
        </ExpandablePanel>
      );
    });
  }

  const onUpdating = classNames({
    ['bg-gray-100 opacity-60']: isFetching,
  });

  return (
    <div>
      <div className="flex flex-row justify-between my-3">
        <div>Albums for {user.name}</div>
        <Button
          loading={results.isLoading}
          onClick={() => {
            handleAddAlbum(user);
          }}
        >
          Add Album
        </Button>
      </div>
      <div className={onUpdating}>{content}</div>
    </div>
  );
};

export default AlbumsList;
