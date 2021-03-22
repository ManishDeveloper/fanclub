import React from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Container,Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch} from "react-redux";
import { logoutUser } from '../../redux/actions/userActions';

const Menubar = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser());
    }
    return (
        <>
<Navbar bg="primary" variant="dark" expand="lg">
    <Container fluid>
    <LinkContainer to="/home">
        <Navbar.Brand>FanClub</Navbar.Brand>
    </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Form inline style={{justifyContent:'center',width:'70%'}}>
      <FormControl style={{width:'300px'}} type="text" placeholder="Search profile and posts.." />
    </Form>
    <Nav className="ml-auto">
        <LinkContainer to="/home">
            <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
        </LinkContainer>
        {/* <LinkContainer to="/profile">
            <Nav.Link><i className="fas fa-user"></i> Profile</Nav.Link>
        </LinkContainer> */}
        <Button type="button" onClick={logoutHandler} className="btn btn-light"><i className="fas fa-sign-out-alt"></i> Logout</Button>
    </Nav>
  </Navbar.Collapse>
    </Container>
</Navbar> 
        </>
    )
}

export default Menubar
