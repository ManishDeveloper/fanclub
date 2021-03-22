import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { userRegister } from '../../redux/actions/userActions';
import Loader from '../Loader';
import {toast} from "react-toastify";

const Register = () => {
    const [formData,setFormData] = useState({userName:'',email:'',password:'',password2:''});

    let {userName,email,password,password2} = formData;

    const dispatch = useDispatch();

    const {loading,registerLoading, isAuthenticated} = useSelector(state => state.user)

    const registerHandler = (e) => {
        e.preventDefault();
        if(password !== password2){
            toast.error('Password not Matched!');
            return false;
        }
        dispatch(userRegister(userName,email,password));
    }
    const changeFields = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
        <>
          <section className="landing">
            <div className="dark-overlay">
            {loading ? <Loader customColor="light"/> : isAuthenticated ? <Redirect to="/home" /> : (
                <>
                <Link className="btn btn-light home-button" to="/">Home</Link>
                <div className="login-form">
                    <h4><i className="fas fa-user"></i> Register User</h4>
                <Form onSubmit={registerHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="userName" value={userName} onChange={changeFields} placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password2" value={password2} placeholder="Confirm Password" onChange={changeFields} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Text>
                        Already Registered? <Link to="/login">Login</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {registerLoading ? "Please Wait.." : "Submit"} 
                    </Button>
                </Form>
                </div>
                </>
            )}
            
            </div>
        </section> 
        </>
    )
}

export default Register;
