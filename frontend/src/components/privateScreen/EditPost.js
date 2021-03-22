import React,{useState} from 'react';
import {Modal,Button,Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { updatePost } from '../../redux/actions/postActions';
import {toast} from "react-toastify";


const EditPost = ({showModal,modalToggle,postText,postId}) => {

    const [formData,setFormData] = useState({updateText:postText});

    const {updateText} = formData;

    const dispatch = useDispatch();

    const editPostHandler = (e) => {
        e.preventDefault();
        if(updateText === ""){
            toast.error("Text Field cannot be empty.");
            return false;
        }
        if(updateText === postText){
            toast.error("Please update post before submit.");
            return false;
        }
        dispatch(updatePost(postId,updateText));
        modalToggle();
    }

    const changeFields = (e) => {
        setFormData({updateText:e.target.value});
    }
    return (
        <>
        <Modal show={showModal} onHide={modalToggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Form style={{width:'100%'}} onSubmit={editPostHandler}>
        <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={5} name="updateText" value={updateText} onChange={changeFields} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalToggle}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update Post
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
        </>
    )
}

export default EditPost
