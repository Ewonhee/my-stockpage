'use client'

import { Container, Form, Button } from 'react-bootstrap';

export default function Write() {
  return (
    <Container className='board'>
      <h4 className="mt-4 mb-3">✏️글작성✏️</h4>
      <Form action="/api/post/new" method="POST">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" placeholder="제목을 입력하세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} placeholder="내용을 입력하세요" />
        </Form.Group>
        <Button variant="primary" type="submit">작성 완료</Button>
      </Form>
    </Container>
  );
}
