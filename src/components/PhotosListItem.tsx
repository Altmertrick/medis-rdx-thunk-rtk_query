import { GoTrashcan } from 'react-icons/go';
import { PhotoT, useRemovePhotoMutation } from '../store';

type PropsT = {
  photo: PhotoT;
};

const PhotosListItem: React.FC<PropsT> = ({ photo }) => {
  const [removePhoto, resultsRemovePhoto] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div className="cursor-pointer relative h-20 w-20 m-2">
      <img className=" " src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-gray-100 hover:opacity-80">
        <GoTrashcan className="text-3xl" onClick={handleRemovePhoto} />
      </div>
    </div>
  );
};

export default PhotosListItem;
