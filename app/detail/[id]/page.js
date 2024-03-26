import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { Container, Row, Col, Button } from 'react-bootstrap';
import DeleteButton from "./DeleteButton";


export default async function Detail(props) {
    const client = await connectDB();
    const db = await client.db('forum');
    const result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})
    
    return (
        <Container className="detail-container">
            <Row className="justify-content-center">
                <Col xs={8}>
                    <div className='detail-content'>
                        <h4 className='detail-title'>{'🚩Title :'+result.title}</h4>
                        <hr className="my-4"/>
                        <p>{result.content}</p>
                    </div>
                    
                    <div className='buttonsContainer'> {/* CSS 클래스 적용 */}
                        <div className='detailButtons'>
                            <DeleteButton postId={result}/>
                        </div>
                        <div className='likeButtons'>
                            <Button className='detail-button'>👍</Button>
                            <Button className='detail-button'>👎</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        
    )
}
