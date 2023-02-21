import { useFetchAlbumsQuery } from '../store';
import { UserT } from '../store';
import Skeleton from './Skeleton';

type PropsT = {
  user: UserT;
};

const AlbumsList: React.FC<PropsT> = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  let content;

  if (isLoading) {
    content = <Skeleton times={3} />;
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
      return <div key={album.id}>{album.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default AlbumsList;
