import { useParams } from 'react-router-dom';

export default function DetailProductPage() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      {id}
      상세페이지 입니다.
    </>
  );
}
