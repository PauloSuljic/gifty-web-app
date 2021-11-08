import React, { useState, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './Pages/About';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navigation from './Components/Navigation';
import Dashboard from './Components/Dashboard';
import Wishlist from './Components/Wishlist';
import MyProfile from './Pages/MyProfile';
import AddFriend from './Pages/AddFriend';
import Friends from './Pages/Friends';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarPage from './Pages/CalendarPage';

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
    }
  },[setUser])

  // Logout function
  const handleLogout = () => {
    setUser({});
    localStorage.clear();
  };

  return (
    <Router>
    <div className="App">
      <Navigation handleLogout={handleLogout} user={user} />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/signup" render={(props) => (
          <Signup {...props} user={user} setUser={setUser}/>
          )}/>
        <Route path="/login" render={(props) => (
          <Login {...props} user={user} setUser={setUser} />
          )}/>
        <Route path="/dashboard" render={(props) => (
          <Dashboard {...props} user={user} />
          )}/>
        <Route path="/wishlist" render={(props) => (
          <Wishlist {...props} user={user} />
          )}/>
        <Route path="/myProfile" render={(props) => (
          <MyProfile {...props} user={user} />
          )}/>
        <Route path="/addFriend" render={(props) => (
          <AddFriend {...props} user={user} />
          )}/>
        <Route path="/friends" render={(props) => (
          <Friends {...props} user={user} />
          )}/>
        <Route path="/calendar" render={(props) => (
          <CalendarPage {...props} user={user} />
          )}/>
      </Switch>
    </div>
    </Router>
  );
}

const Home = () => {
  return(
    <div>
      <div>
          <h2>Welcome to Gifty</h2>
      </div>
    </div>
  );
}

export default App;
