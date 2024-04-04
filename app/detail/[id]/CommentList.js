'use client'

import { Button, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const CommentList = ({ comments }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);


  // comments가 유효한 배열이 아닌 경우 빈 배열로 초기화합니다.
  const commentsArray = Array.isArray(comments) ? comments : [];


  

  console.log(parent)

  const handleDelete = async (commentId) =>{
      
    try {
      const response = await fetch('/api/comment/delete', { // 수정된 부분
        method: 'DELETE',
        body: commentId
      });      
      if (response.ok) {
        console.log('댓글이 성공적으로 삭제되었습니다.');
        window.location.reload();
        // 삭제 후에는 댓글 목록을 업데이트해야 할 수도 있습니다.
      } else {
        console.error('댓글 삭제 실패:', response.statusText);
      }
    } catch (error) {
      console.error('삭제 요청 오류', error);
    }
  };

  return (
    <ListGroup className="comment-list">
      {/* commentsArray를 사용하여 댓글 목록을 렌더링합니다. */}
      {commentsArray.map((comment, index) => (
        <ListGroup.Item
          className='comment-item'
          key={index}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        >
          {/* 댓글 내용 표시 */}
          {comment.content}
          {/* 삭제 버튼 */}
          <Button
            variant='danger'
            className={`delete-button ${hoverIndex === index ? 'visible' : 'hidden'}`}
            onClick={() => handleDelete(comment._id)} // 삭제 버튼 클릭 시 handleDelete 함수 호출
          >
            삭제
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
