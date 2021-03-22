import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";
import Loader from '../Loader';

const Home = () => {

    const {loading,isAuthenticated} = useSelector(state=>state.user);

    return (
        <>
            <section className="landing">
                <div className="dark-overlay">
                {loading ? <Loader customColor="light" /> : isAuthenticated ? <Redirect to="/home" /> : (
                    <div className="landing-inner">
                        <h1>Welcome To Fanclub</h1>
                        <p>A Social Network Platform to connect people around the World!</p>
                        <div className="button">
                            <Link className="btn btn-primary mx-3" to="/login">Login</Link>
                            <Link className="btn btn-light" to="/register">Register</Link>
                        </div>
                    </div>
                )}
                </div>
            </section>
        </>
    )
}

export default Home
