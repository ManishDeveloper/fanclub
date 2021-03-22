import React,{useState} from 'react';
import {Image,Form,Button} from "react-bootstrap";
import avatar from "../../images/man-avatar.jpg";
import {useDispatch} from "react-redux";
import { addComment } from '../../redux/actions/postActions';
import {toast} from "react-toastify";

const CommentBox = ({postId,commentList}) => {

    const [commentText, setCommentText] = useState('');

    const dispatch = useDispatch();

    const addCommentHandler = (e) => {
        e.preventDefault();

        if(commentText === ""){
            toast.error("Please type any comment.");
            return false;
        }
        dispatch(addComment(postId,commentText));
        setCommentText('');
    }
    
    return (
        <>
           <div className="comment-box pb-5">
               <Form onSubmit={addCommentHandler}>
                <div className="comment-text-box d-flex">
                    <Form.Group className="mr-3 flex-grow-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" placeholder="What do you think about this post?" rows={3} value={commentText} onChange={(e)=>setCommentText(e.target.value)}  />
                    </Form.Group>
                    <Button className="btn btn-primary" style={{height:'40px'}} type="submit">Submit</Button>
                </div>
                </Form>

                {commentList.length === 0  ? <h3>No Comments</h3> : (
                    <>
                    {commentList.map((comment,index)=>(
                        <div key={index} className="comment-list-box d-flex mb-3" style={{borderBottom:'1px solid #bcbcbc'}}>
                        <Image src={avatar} />
                        <p>{comment.user.name}<br />
                        <span className="d-block mt-1" style={{color:'#4d5760'}}>{comment.comment}</span>
                        </p>
                    </div>
                    ))}

                    </>
                )}

            </div> 
        </>
    )
}

export default CommentBox;
