'use client'

import { Button, ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const CommentList = ({ comments }) => {
  const [hoverIndex, setHoverIndex] = useState(-1); // 마우스 호버 상태를 관리하는 상태 변수

  // comments가 유효한 배열이 아닌 경우 빈 배열로 초기화합니다.
  const commentsArray = Array.isArray(comments) ? comments : [];

  // 댓글 삭제 함수
  const handleDelete = async (commentId) =>{
    try {
      // 댓글 삭제 API로 DELETE 요청을 보냅니다.
      const response = await fetch('/api/comment/delete', {
        method: 'DELETE',
        body: commentId // 삭제할 댓글의 ID를 요청 본문에 담아 보냅니다.
      });      
      if (response.ok) { // 요청이 성공하면
        console.log('댓글이 성공적으로 삭제되었습니다.');
        window.location.reload(); // 페이지를 새로고침하여 삭제된 댓글을 반영합니다.
      } else {
        console.error('댓글 삭제 실패:', response.statusText);
      }
    } catch (error) {
      console.error('삭제 요청 오류', error);
    }
  };

  return (
    <ListGroup className="comment-list">
      {/* 댓글 목록을 렌더링합니다. */}
      {commentsArray.map((comment, index) => (
        <ListGroup.Item
          className='comment-item'
          key={index}
          onMouseEnter={() => setHoverIndex(index)} // 마우스 호버 시 인덱스 업데이트
          onMouseLeave={() => setHoverIndex(-1)} // 마우스 이탈 시 인덱스 초기화
        >
          {/* 댓글 내용 */}
          {comment.content}
          {/* 삭제 버튼 */}
          <Button
            variant='danger'
            className={`delete-button ${hoverIndex === index ? 'visible' : 'hidden'}`} // 호버 인덱스에 따라 버튼의 가시성 변경
            onClick={() => handleDelete(comment._id)} // 삭제 버튼 클릭 시 해당 댓글 삭제
          >
            삭제
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
