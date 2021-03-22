import React,{useState} from 'react';
import {Card,Button,Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { addPost } from '../../redux/actions/postActions';
import {toast} from "react-toastify";

const AddPost = () => {
    const [formData, setFormData] = useState({postText:''});

    const {postText} = formData;

    const dispatch = useDispatch();

    const addPostHandler = (e) => {
        e.preventDefault();
        if(postText === ""){
            toast.error("Please type, what's in your mind?");
            return false;
        }
        dispatch(addPost(postText)); 
        setFormData({postText:''});
    }

    const changeFields = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
        <>
        <Form style={{width:'100%'}} onSubmit={addPostHandler}>
        <Card className="mb-4">
        <Card.Header><h4><i className="fas fa-pancil"></i> Post Something</h4></Card.Header>
        <Card.Body>
            <Card.Text>
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={5} name="postText" placeholder="Type here.. What's in your mind?" value={postText} onChange={changeFields} />
        </Form.Group>
            </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex">
            <Button variant="light"><i className="fas fa-camera"></i></Button>
            <Button type="submit" className="ml-auto" variant="primary">Add Post &nbsp; <i className="fas fa-plane"></i></Button>
        </Card.Footer>
        </Card>
        </Form>
        </>
    )
}

export default AddPost;
