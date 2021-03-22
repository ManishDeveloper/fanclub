import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "../components/Loader";

const PrivateRoute = ({component:Component,...rest}) => {

    const {loading,isAuthenticated} = useSelector(state=>state.user);

    return (
           <Route {...rest} render={props=> loading ? <Loader customColor="dark" /> : isAuthenticated ? <Component {...props} /> : <Redirect to="/" /> } />
    )
}

export default PrivateRoute;
