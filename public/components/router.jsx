// // Reactrouter was imported via cdn - defining often-used react-router variables here
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;
var browserHistory = window.ReactRouter.browserHistory;

// function that handles response from server
var getData = function(data, cb){
  cb(data);
}

// React router that switches between signin and pet app
var MainRouter = () => (
  <Router history={browserHistory}>
    <Route path='home' component={App}/> 
    <Route path='login' component={Login}/>
    <Route path='signup' component={SignUp}/>

  </Router>
)

ReactDOM.render(<MainRouter />, document.getElementById('app'))

