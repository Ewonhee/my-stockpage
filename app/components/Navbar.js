'use client'
// components/Navbar.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Loginbtn from '../Loginbtn';
import Logoutbtn from '../Logoutbtn';
import { SessionProvider, useSession } from 'next-auth/react';

function CustomNavbar() {
  const { data: session } = useSession();


  return (
    <nav style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '1000' }}>
      <Navbar className='navbar-custom' bg="primary" expand="lg" style={{ fontStyle: 'italic' }}>
        <Navbar.Brand href="./" style={{ marginLeft: '20px', fontWeight: 'bold', fontSize: '30px', color: 'white' }}>StockPages</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="./" style={{ borderBottom: '2px solid white' }}>Home</Nav.Link>
            <Nav.Link href='/Search' style={{ borderBottom: '2px solid white' }}>Search</Nav.Link>
            <Nav.Link href="/function_test" style={{ borderBottom: '2px solid white' }}>Chat</Nav.Link>
            <Nav.Link href="/talk" style={{ borderBottom: '2px solid white' }}>Talk</Nav.Link>
            <Nav.Link href="./test" style={{ borderBottom: '2px solid white' }}>Signup</Nav.Link>
            <div className='login'>
              {session ? (
                <>
                  <span className='loginname'>{session.user.name}</span>
                  <Logoutbtn/>
                </>
              ) : (
                <Loginbtn />
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}

export default function CustomNavbarWrapper() {
  return (
    <SessionProvider>
      <CustomNavbar />
    </SessionProvider>
  );
}
