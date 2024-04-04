'use client'

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import CommentList from './CommentList';

const CommentForm = ({ parent }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [parent]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comment/list?id=${parent}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('댓글 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 목록을 불러오는 도중 오류가 발생했습니다:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        
        body: JSON.stringify({ comment: comment, _id: parent })
      });
      if (response.ok) {
        console.log('댓글이 성공적으로 작성되었습니다.');
        setComment('');
        fetchComments(); // 댓글 작성 후 목록을 다시 가져옵니다.
      } else {
        console.error('댓글 작성 실패:', response.statusText);
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  return (
    <div>
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
        <CommentList comments={comments} parent={parent} />
      </div>
    </div>
  );
};

export default CommentForm;
