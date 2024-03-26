'use client'
// DeleteButton.js

// Next.js의 라우터 훅을 가져옵니다.
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ postId }) => {
  // postId에서 _id를 추출합니다.
  const pid = postId._id;

  // Next.js의 라우터 객체를 가져옵니다.
  const router = useRouter();

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = async () => {
    try {
      // 서버로 DELETE 요청을 보냅니다. URL에 postId를 포함시킵니다.
      const response = await fetch(`/api/post/delete/${pid}`, {
        method: 'DELETE'
      });

      // 서버 응답이 정상적인 경우
      if (response.ok) {
        // 삭제 성공 시 '/talk' 페이지로 이동하고 페이지를 새로고침합니다.
        router.push('/talk');
        router.refresh();
      } else {
        // 서버 응답이 오류인 경우
        throw new Error('삭제 실패');
      }
    } catch (error) {
      // 요청 오류 처리
      console.error('삭제 요청 오류:', error);
    }
  };

  // 삭제 버튼을 렌더링합니다.
  return (
    <Button variant="danger" onClick={handleDelete}>
      삭제
    </Button>
  );
};

export default DeleteButton;
