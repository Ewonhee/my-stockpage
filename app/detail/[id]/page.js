import { connectDB } from "@/util/database"; // 데이터베이스 연결 함수를 가져옵니다.
import { ObjectId } from "mongodb"; // MongoDB ObjectId를 사용하기 위해 가져옵니다.
import { Container, Row, Col, Button } from 'react-bootstrap'; // React Bootstrap에서 필요한 컴포넌트를 가져옵니다.
import DeleteButton from "./DeleteButton"; // 삭제 버튼 컴포넌트를 가져옵니다.
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";


// Detail 컴포넌트 정의
export default async function Detail(props) {
    // 데이터베이스 연결 및 해당 포스트의 정보를 가져옵니다.
    const client = await connectDB();
    const db = await client.db('forum');
    const result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
    
    let parent = props.params.id

    return (
        // 상세 페이지 컨테이너
        <Container className="detail-container">
            {/* 가운데 정렬된 행 */}
            <Row className="justify-content-center">
                {/* 8칸 컬럼 */}
                <Col xs={8}>
                    {/* 상세 내용을 표시하는 컨텐츠 */}
                    <div className='detail-content'>
                        {/* 제목 표시 */}
                        <h4 className='detail-title'>{'🚩Title :'+result.title}</h4>
                        {/* 구분선 */}
                        <hr className="my-4"/>
                        {/* 내용 표시 */}
                        <p>{result.content}</p>
                    </div>
                    
                    {/* 버튼 컨테이너 */}
                    <div className='buttonsContainer'> 
                        {/* 삭제 버튼 */}
                        <div className='detailButtons'>
                            <DeleteButton postId={result}/>
                        </div>
                        {/* 좋아요/싫어요 버튼 */}
                        <div className='likeButtons'>
                            <Button className='detail-button'>👍</Button>
                            <Button className='detail-button'>👎</Button>
                        </div>
                    </div>
                    <div className="CommentForm">
                    <CommentForm parent ={parent}/>
                    <CommentList parent ={parent}/>
                    </div>
                    
                    
                </Col>
            </Row>
        </Container>
    );
}
