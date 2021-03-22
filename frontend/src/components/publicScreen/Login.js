import React,{useState} from 'react';
import {Form,Button} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {userLogin} from "../../redux/actions/userActions";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../Loader';


const Login = () => {
    const [formData,setFormData] = useState({email:'',password:''});

    let {email,password} = formData;

    const dispatch = useDispatch();

    const {loginLoading,loading,isAuthenticated} = useSelector(state=>state.user);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email,password));
    }
    const changeFields = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    return (
        <>
          <section className="landing">
            <div className="dark-overlay">
            {loading ? <Loader customColor="light" /> : isAuthenticated ? <Redirect to="/home" /> : (
                <>
                <Link className="btn btn-light home-button" to="/">Home</Link>
                <div className="login-form">
                    <h4><i className="fas fa-user"></i> Login User</h4>
                <Form onSubmit={loginHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={changeFields} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeFields} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Text>
                        Not Registered? <Link to="/register">Register</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {loginLoading ? "Please Wait..": "Submit"}
                    </Button>
                </Form>
                </div>
                </>
            ) }
            
            </div>
        </section>  
        </>
    )
}

export default Login;
