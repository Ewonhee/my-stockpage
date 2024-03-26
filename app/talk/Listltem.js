'use client'

// Listltem.js

import React from 'react';
import Link from 'next/link';
import { Table, Button } from 'react-bootstrap';

const ListItem = (props) => {
    return (
        <div className='posts-container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {props.result.map((data, i) => {
                        const postId = data._id;
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>
                                    <Link href={'/detail/' + data._id}>{data.title}</Link>
                                </td>
                                <td>{data.content}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button variant='primary'><Link className='but' href="/create-board">게시판 만들기</Link></Button>

        </div>
    );
};

export default ListItem;
