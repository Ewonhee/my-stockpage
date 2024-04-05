'use client'
// 댓글 작성 폼과 댓글 목록을 관리하는 컴포넌트입니다.
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import CommentList from './CommentList'; // CommentList 컴포넌트를 가져옵니다.

const CommentForm = ({ parent }) => {
  const [comment, setComment] = useState(''); // 사용자가 입력한 댓글을 관리하는 상태입니다.
  const [comments, setComments] = useState([]); // 댓글 목록을 관리하는 상태입니다.

  // 부모 컴포넌트가 변경될 때마다 댓글 목록을 다시 불러옵니다.
  useEffect(() => {
    fetchComments();
  }, [parent]);

  // 서버로부터 댓글 목록을 가져오는 함수입니다.
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comment/list?id=${parent}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data); // 가져온 댓글 목록을 상태에 저장합니다.
      } else {
        console.error('댓글 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 목록을 불러오는 도중 오류가 발생했습니다:', error);
    }
  };

  // 댓글을 작성하는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        body: JSON.stringify({ comment: comment, _id: parent }) // 작성한 댓글과 부모 ID를 서버로 전송합니다.
      });
      if (response.ok) {
        console.log('댓글이 성공적으로 작성되었습니다.');
        setComment(''); // 댓글 작성 후 입력창을 초기화합니다.
        fetchComments(); // 댓글 작성 후 목록을 다시 불러옵니다.
      } else {
        console.error('댓글 작성 실패:', response.statusText);
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  return (
    <div>
      {/* 댓글 작성 폼 */}
      <Form className='CommentForm' onSubmit={handleSubmit}>
        <Form.Group controlId="commentTextarea">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button className='Comment-button' variant="primary" type="submit">
          댓글 작성
        </Button>
      </Form>
      <div>
        {/* 댓글 목록을 표시하는 CommentList 컴포넌트를 렌더링합니다. */}
        <CommentList comments={comments} parent={parent} />
      </div>
    </div>
  );
};

export default CommentForm;
