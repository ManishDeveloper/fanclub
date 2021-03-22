import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './components/privateScreen/MainPage';
import Profile from './components/privateScreen/Profile';
import Home from './components/publicScreen/Home';
import Login from './components/publicScreen/Login';
import Register from './components/publicScreen/Register';
import {useDispatch} from "react-redux";
import {authUser} from "./redux/actions/userActions";
import PrivateRoute from './routing/PrivateRoute';
import {ToastContainer, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ViewPost from './components/privateScreen/ViewPost';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(authUser());
  },[])

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/home" component={MainPage} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/:id" component={ViewPost} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <ToastContainer position="bottom-right" transition={Slide} />
    </Router>
  );
}

export default App;
