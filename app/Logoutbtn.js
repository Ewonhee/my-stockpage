'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from 'react-bootstrap';



const Logoutbtn = () => {
  return (
    <Button variant="info" onClick={()=>{signOut()}} >로그아웃</Button>
  )
}

export default Logoutbtn