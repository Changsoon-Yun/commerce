import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';

interface CardImgProps {
  imageList: string[];
}

export default function CardImg({ imageList }: CardImgProps) {
  return (
    <>
      <div className={'relative w-full h-0 pb-[120%] rounded-lg overflow-hidden'}>
        <img
          data-testid={'product-img'}
          src={imageList[0]}
          alt="img"
          className={'absolute top-0 left-0 w-full h-full  rounded-lg hover:scale-105 transition'}
        />
        {imageList.length > 1 && (
          <div className={'absolute top-3 right-3 text-zinc-500'}>
            <RiCheckboxMultipleBlankLine />
          </div>
        )}
      </div>
    </>
  );
}
