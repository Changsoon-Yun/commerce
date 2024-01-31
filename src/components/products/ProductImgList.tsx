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
      <div className={'flex flex-col'}>
        <div>업로드 될 이미지</div>
        <div className={'flex gap-4'}>
          {previewImages.map((src) => (
            <div className={'relative  p-3'} key={src}>
              <div className={'w-24 h-24 border border-zinc-300'}>
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
      </div>
    </>
  );
}
