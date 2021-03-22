import React,{useState} from 'react';
import {Form,Button,Modal,InputGroup,FormControl} from "react-bootstrap";
import {useDispatch} from "react-redux";
import { updateBioDetails } from '../../redux/actions/userActions';

const UpdateBio = ({showModal,bioModalToggle,userBio}) => {

    const [formData, setFormData] = useState({
        bio:userBio.bio ? userBio.bio : '',
        profession:userBio.profession ? userBio.profession : '',
        location:userBio.location ? userBio.location : '',
        company:userBio.company ? userBio.company : '',
        facebook:userBio.facebook ? userBio.facebook : '',
        twitter:userBio.twitter ? userBio.twitter : '',
        linkedin:userBio.linkedin ? userBio.linkedin : '',
        instagram:userBio.instagram ? userBio.instagram : ''
    });

    const {bio,profession,location,company,facebook,twitter,linkedin,instagram} = formData;

    const dispatch = useDispatch()

    const updateBioHandler = (e) => {
        e.preventDefault();
        dispatch(updateBioDetails(formData));
        bioModalToggle();
    }

    const changeFields = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    return (
        <>
        <Modal show={showModal} onHide={bioModalToggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Bio</Modal.Title>
        </Modal.Header>
        <Form style={{width:'100%'}} onSubmit={updateBioHandler}>
        <Modal.Body>
            <Form.Group controlId="formBasicText">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" name="bio" value={bio} onChange={changeFields} placeholder="Enter something about your self" />
            </Form.Group>

            <Form.Group controlId="formBasicText">
                <Form.Label>Profession</Form.Label>
                <Form.Control type="text" name="profession" value={profession} placeholder="Enter what you do?" />
            </Form.Group>

            <Form.Group controlId="formBasicText">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={location} onChange={changeFields} placeholder="Where you live?" />
            </Form.Group>

            <Form.Group controlId="formBasicText">
                <Form.Label>Company or College/University</Form.Label>
                <Form.Control type="text" name="company" value={company} onChange={changeFields} placeholder="Enter Company or your college/university name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Text style={{fontSize:'14px'}}>
                Social Media Links
                </Form.Text>
            </Form.Group>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><i style={{color:'#3b5998',fontSize:'18px'}} className="fab fa-facebook-square"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="facebook Url"
                aria-label="Facebook"
                name="facebook"
                value={facebook}
                onChange={changeFields}
                aria-describedby="basic-addon1"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><i style={{color:'#3b5998',fontSize:'18px'}} className="fab fa-twitter"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Twitter Url"
                aria-label="Twitter"
                name="twitter"
                value={twitter}
                onChange={changeFields}
                aria-describedby="basic-addon1"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><i style={{color:'#0e76a8',fontSize:'18px'}} className="fab fa-linkedin"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Linkedin Url"
                aria-label="Linkedin"
                name="linkedin"
                value={linkedin}
                onChange={changeFields}
                aria-describedby="basic-addon1"
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><i style={{color:'#8a3ab9',fontSize:'18px'}} className="fab fa-instagram-square"></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Instagram Url"
                aria-label="Instagram"
                name="instagram"
                value={instagram}
                onChange={changeFields}
                aria-describedby="basic-addon1"
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={bioModalToggle}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update Bio
          </Button>
        </Modal.Footer>
        </Form>
      </Modal> 
        </>
    )
}

export default UpdateBio;
