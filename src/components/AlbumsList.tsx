import {
  AlbumT,
  useAddAlbumMutation,
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
} from '../store';
import { UserT } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import classNames from 'classnames';
import AlbumsListItem from './AlbumsLitsItem';

type PropsT = {
  user: UserT;
};

const AlbumsList: React.FC<PropsT> = ({ user }) => {
  const { data, error, isLoading, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = (user: UserT) => {
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
    //Render Albums
    content = data?.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  const onUpdating = classNames({
    ['bg-gray-100 opacity-60']: isFetching,
  });

  return (
    <div>
      <div className="m-3 flex flex-row items-center justify-between ">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
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
