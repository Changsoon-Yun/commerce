import { TiDelete } from 'react-icons/ti';
import { useParams } from 'react-router-dom';

interface ProductImgListProps {
  previewImages: string[];
  deleteImageHandler: (targetSrc: string, id?: string) => void;
}
export default function ProductImgList({ previewImages, deleteImageHandler }: ProductImgListProps) {
  const { id } = useParams();
  return (
    <>
      <div className={'flex flex-1 overflow-auto'} data-cy={'image-list'}>
        {previewImages.map((src) => (
          <div className={'relative p-3'} key={src}>
            <div className={'w-20 h-20 border-2 border-zinc-300 rounded overflow-hidden'}>
              <img src={src} alt="image" className={'w-full h-full object-cover'} />
              <button
                className={'absolute top-0 right-0'}
                type={'button'}
                onClick={() => {
                  deleteImageHandler(src, id);
                }}>
                <TiDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
