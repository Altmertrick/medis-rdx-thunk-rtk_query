import { AlbumT, useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

type PropsT = {
  album: AlbumT;
};

const PhotosList: React.FC<PropsT> = ({ album }) => {
  const { data, error, isLoading, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, resultsAddPhoto] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={4} className={'h-8 w-8'} />;
  } else if (error) {
    content = <div>Error fetching photos...</div>;
  } else {
    content = data?.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between  ">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={resultsAddPhoto.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex justify-center overflow-x-auto">
        <div className="flex">{content}</div>
      </div>
    </div>
  );
};

export default PhotosList;
