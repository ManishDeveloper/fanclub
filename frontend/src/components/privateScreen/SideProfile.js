import React,{useState} from 'react';
import {Image,Button} from "react-bootstrap";
import avatar from "../../images/man-avatar.jpg";
import {useSelector} from "react-redux";
import UpdateBio from './UpdateBio';
import {Link} from "react-router-dom";
import Loader from '../Loader';

const SideProfile = () => {
    const [updateBioModal,setUpdateBioModal] = useState(false);
    const {user,userBio,userBioLoading} = useSelector(state => state.user);
    const {postList} = useSelector(state=>state.post);

    const bioModalToggle = (e) => {
        setUpdateBioModal(!updateBioModal);
    }

    const totalPosts = postList.filter(post=>post.user._id === user._id);

    return (
        <>
            {updateBioModal && <UpdateBio showModal={updateBioModal} bioModalToggle={bioModalToggle} userBio={userBio} />}
           <div className="side-profile-box mb-3">
               {userBioLoading ? <Loader /> : (
                   <>
                   <div className="user-profile">
               <Image src={avatar} rounded />
               </div>
               <div className="user-info px-3">
                   <h3 className="text-capitalize">Welcome {user.name}</h3>
                   {userBio.bio ? <p>{userBio.bio.slice(0,150)}</p> : <p>Update your Bio Details, Click Below Update Bio Button. </p>} 
                <div className="follower-box d-flex justify-content-around mb-4">
                    <h4>{totalPosts.length} <br/> <span style={{color:'#4d5760'}}>Posts</span></h4>
                    <h4>{user.following.length} <br/> Following</h4>
                    <h4>{user.followers.length} <br/> Followers</h4>
                    
                </div>
                    {userBio.location && <p className="text-left"><span style={{color:"#64707d"}}>LOCATION :</span><br />{userBio.location}</p>}

                    {userBio.profession && <p className="text-left"><span style={{color:"#64707d"}}>PROFESSION :</span><br />{userBio.profession}</p>}

                    {userBio.company && <p className="text-left"><span style={{color:"#64707d"}}>COMPANY/COLLEGE :</span><br />{userBio.company}</p>}
                   
                   <p className="text-left"><span style={{color:"#64707d"}}>JOINED :</span> <br />14-5-2020</p>

                   <Button title="Update Bio" className="ml-auto mr-auto mb-4" variant="primary" onClick={()=>bioModalToggle()}>Update Bio</Button>

                   {userBio.social && <div style={{marginLeft:'-16px',marginRight:'-16px',fontSize:'25px',borderTop:'1px solid #bcbcbc'}} className="social-icon-box d-flex justify-content-around p-3">

                    {userBio.social.facebook && <Link to={userBio.social.facebook}><i style={{color:'#3b5998'}} className="fab fa-facebook-square"></i></Link>}

                    {userBio.social.twitter && <Link to={userBio.social.twitter}><i style={{color:'#3b5998'}} className="fab fa-twitter"></i></Link>}

                    {userBio.social.linkedin && <Link to={userBio.social.linkedin}><i style={{color:'#0e76a8'}} className="fab fa-linkedin"></i></Link> }

                    {userBio.social.instagram && <Link to={userBio.social.instagram} ><i style={{color:'#8a3ab9'}} className="fab fa-instagram-square"></i></Link>}
                   
                   </div>}
               </div>
                   </>
               )}
               
           </div>
        </>
    )
}

export default SideProfile;
