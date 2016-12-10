// // Reactrouter was imported via cdn - defining often-used react-router variables here
// import {Router, Route, Link, browserHistory} from 'react-router'
// import React from 'react';
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;
var browserHistory = window.ReactRouter.browserHistory;

// fake data for testing - should represent http.get
var fakeData = {
  name: 'Chad',
  mood: 'sad',
  level: 1,
  phys: 'hungry',
  img: 'https://68.media.tumblr.com/f9163301bc2421f19511504438af351a/tumblr_nla0f65UNA1rllm0ko1_400.gif',
  status: 'chill'
}

// function that handles response from server
var getData = function(data, cb){
  cb(data);
}

// var loggedIn = function() {
//   return !!localStorage.token
// }

// function requireAuth(nextState, replace) {
//   if (!loggedIn()) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }

// React router that switches between signin and pet app
var MainRouter = () => (
  <Router history={browserHistory}>
    <Route path='home' component={App}/> 
    <Route path='login' component={Login}/> 
    <Route path='*' component={Login}/> 
  </Router>
)

window.getData = getData;
ReactDOM.render(<MainRouter />, document.getElementById('app'))


// ReactDOM.render(<App getData={getData}/>, document.getElementById('app'))
