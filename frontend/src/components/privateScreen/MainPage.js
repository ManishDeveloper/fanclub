import React,{useEffect} from 'react'
import Menubar from './Menubar';
import "./privateStyle.css";
import {Container,Row,Col} from "react-bootstrap";
import SideProfile from './SideProfile';
import AddPost from './AddPost';
import AllPosts from './AllPosts';
import {getPosts} from "../../redux/actions/postActions";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../Loader";
import Peoples from './Peoples';

const MainPage = () => {

    const dispatch = useDispatch();

    const {postLoading,postList} = useSelector(state=>state.post);

    useEffect(()=>{
        dispatch(getPosts());
    },[]);
    return (
        <>
           <Menubar />
           <Container>
            <Row className="m-0">
                <Col md={8} className="p-3">
                    <Row className="m-0">
                        <AddPost />
                    </Row>
                    <Row className="m-0">
                        {postLoading ? <Loader /> : <AllPosts allPosts={postList} />}
                    </Row>
                </Col>
                <Col md={4} className="p-3">
                    <SideProfile />
                    <Peoples />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default MainPage
