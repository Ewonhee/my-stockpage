'use client'
// components/Loginbtn.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from 'next-auth/react'

const Loginbtn = () => {
  return (
 
      <Button variant='info' onClick={() => { signIn() }}>로그인</Button>
   
  );
};

export default Loginbtn;
