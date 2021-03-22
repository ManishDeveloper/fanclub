import React,{useState} from 'react';
import {Image,Button,Container,Row,Col} from "react-bootstrap";
import avatar from "../../images/man-avatar.jpg";
import {useSelector} from "react-redux";
import Menubar from './Menubar';
import UpdateBio from './UpdateBio';

const Profile = () => {
    const [updateBioModal,setUpdateBioModal] = useState(false);

    const {user} = useSelector(state => state.user);
    const {postList} = useSelector(state=>state.post);

    const bioModalToggle = (e) => {
        setUpdateBioModal(!updateBioModal);
    }

    const totalPosts = postList.filter(post=>post.user._id === user._id);

    return (
        <>
            {updateBioModal && <UpdateBio showModal={updateBioModal} bioModalToggle={bioModalToggle} />}
            <Menubar />
            <Container className="my-3" style={{maxWidth:'600px'}}>
                <Row>
                    <Col>
                    <div className="side-profile-box mb-3">
                    <div className="user-profile">
                    <Image src={avatar} rounded />
                    </div>
                    <div className="user-info px-3">
                        <h3 className="text-capitalize">Welcome {user.name}</h3>
                        <p>I am Full Stack Developer using Javascript Technologies.</p>
                        <div className="follower-box d-flex justify-content-around mb-4">
                            <h4>{totalPosts.length} <br/> <span style={{color:'#4d5760'}}>Posts</span></h4>
                            <h4>{user.following.length} <br/> Following</h4>
                            <h4>{user.followers.length} <br/> Followers</h4>
                        </div>
                        <div className="profile-update-box d-flex flex-flow-end">
                            <Button onClick={bioModalToggle} className="ml-auto" variant="success">Update Bio</Button>
                        </div>
                        
                        <p className="text-left"><span style={{color:"#64707d"}}>LOCATION :</span><br />India</p>
                        <p className="text-left"><span style={{color:"#64707d"}}>PROFESSION :</span> <br />Software Enginner</p>
                        <p className="text-left"><span style={{color:"#64707d"}}>JOINED :</span> <br />14-5-2020</p>
                        <Button className="m-auto" variant="primary">View Profile</Button>
                    </div>
                </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile;
