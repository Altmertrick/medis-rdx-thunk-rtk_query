import { GoX } from 'react-icons/go';
import { AlbumT, useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

type PropsT = {
  album: AlbumT;
};

const AlbumsListItem: React.FC<PropsT> = ({ album }) => {
  const [removeAlbum, resultsRemoveAlb] = useRemoveAlbumMutation();

  const handleRemoveAlbum = (album: AlbumT) => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={resultsRemoveAlb.isLoading}
        onClick={() => {
          handleRemoveAlbum(album);
        }}
      >
        <GoX />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
