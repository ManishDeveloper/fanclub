import React,{useState} from 'react';
import { Alert, Card,Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import avatar from "../../images/man-avatar.jpg";
import {useSelector, useDispatch} from "react-redux";
import {deletePost, postLike,postUnike} from "../../redux/actions/postActions";
import EditPost from './EditPost';
import CommentBox from './CommentBox';

const AllPosts = ({allPosts,viewSinglePost}) => {

    let {user:loginUser} = useSelector(state=>state.user);

    const [editPostModal,setEditPostModal] = useState(false);

    const [editPost,setEditPost] = useState({editPostId:'', editPostText:''});

    const {editPostId,editPostText} = editPost;

    const modalToggle = (postText,postId) => {
        setEditPost({editPostId:postId, editPostText:postText});
        setEditPostModal(!editPostModal);
    } 

    const dispatch = useDispatch();

    const postLikeHandler = e => {
        dispatch(postLike(e.target.id));
    }

    const postUnlikeHandler = e => {
        dispatch(postUnike(e.target.id));
    }

    const deletePostHandler = (postId) => {
        let sure = window.confirm("Are you Sure for Delete Post!");

        if(sure){
            dispatch(deletePost(postId));
        }
    }
    
    return (
        <>
        {/*Edit Post Modal */}
        {editPostModal && <EditPost postText={editPostText} postId={editPostId} showModal={editPostModal} modalToggle={modalToggle} />}
        {loginUser.following.length === 0 && <Alert className="flex-grow-1" variant="warning">Please follow Peoples to see their Posts.</Alert>}
        
        {allPosts.map((post,index)=>(
        <>
        {((loginUser.following.filter(followUser=>followUser.user.toString() === post.user._id.toString()).length > 0) || (loginUser._id.toString() === post.user._id)) && <Card key={index} className="mb-4" style={{width:'100%'}}>
        <Card.Body>
            <div className="user-box d-flex justify-content-between">
                <div className="avatar-name-box d-flex">
                    <Image src={avatar} rounded />
                <p className="text-capitalize">{post.user.name} <br />
                <span>4 min ago</span></p>
                </div>
                {post.user._id.toString() === loginUser._id.toString() && (
                <div className="edit-delete-box">
                    <i title="Edit Post" className="fas fa-edit mr-3" onClick={()=>modalToggle(post.text,post._id)}></i>
                    <i title="Delete Post" className="fas fa-trash" onClick={()=>deletePostHandler(post._id)}></i>
                </div>
                )}
            </div>
            <div className="user-post">
                <p>{post.text.slice(0,200)}</p>
            </div>
        </Card.Body>
        <Card.Footer className="d-flex" style={{alignItems:'center',fontSize:'16px'}}>
            <span> {post.likes.filter((like)=>like.user.toString() === loginUser._id).length > 0 ? <i id={post._id} onClick={postUnlikeHandler} style={{cursor:'pointer',color:'red'}} className="fas fa-heart"></i> : <i style={{cursor:'pointer'}} className="far fa-heart" id={post._id} onClick={postLikeHandler}></i>} &nbsp; {post.likes.length} Likes</span>
            <span className="mx-3">{post.comments.length > 0 ? <i className="fas fa-comment" style={{color:'#127ba3'}}></i> : <i className="far fa-comment"></i>} &nbsp; {post.comments.length} Comments</span>
            {!viewSinglePost && <Link to={`/post/${post._id}`} className="btn btn-primary ml-auto" variant="primary">View Post</Link>}
        </Card.Footer>
            {viewSinglePost && <Card.Footer><CommentBox postId={post._id} commentList={post.comments} /></Card.Footer> }
        </Card> }
        
        
        </>
        ))}
          
        </>
    )
}

AllPosts.defaultProps = {
    viewSinglePost:false
}

export default AllPosts;
