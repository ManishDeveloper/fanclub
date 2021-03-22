import React from 'react';
import avatar from "../../images/man-avatar.jpg";
import {Image,Badge,Button} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import { addFollow, removeFollow } from '../../redux/actions/userActions';

const Peoples = () => {
    const {peopleList} = useSelector(state=>state.people);
    const {user} = useSelector(state => state.user);

    const dispatch = useDispatch();

    const addFollowHandler = (userId) => {

        dispatch(addFollow(userId));
    }

    const unfollowHandler = (userId) => {

        dispatch(removeFollow(userId));
    }

    return (
        <>
            <div className="following-box p-4" style={{height:"400px",overflowY:'auto'}}>
                {peopleList.map((people,index)=>(
                    <div key={index} className="align-box d-flex justify-content-between">
                    <div className="pic-box d-flex">
                    <Image src={avatar} rounded />
                    <p className="text-capitalize">{people.name}</p>
                    </div>
        {user.following.filter((followUser)=> followUser.user.toString() === people._id.toString()).length > 0 ?  <Button className="btn btn-danger" onClick={()=>unfollowHandler(people._id)}>unfollow</Button> : <Button className="btn btn-success" onClick={()=>addFollowHandler(people._id)}>Follow</Button>} 
        
                </div>
                ))}
                
            </div>
        </>
    )
}

export default Peoples;
