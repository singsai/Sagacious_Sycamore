// fake data for testing - should represent http.get
var fakeData = {
  name: 'Chad',
  mood: 'sad',
  level: 1,
  phys: 'hungry',
  img: 'https://68.media.tumblr.com/f9163301bc2421f19511504438af351a/tumblr_nla0f65UNA1rllm0ko1_400.gif',
  status: 'normal'
}

// function that handles response from server
var getData = function(data, cb){
  cb(data);
}

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;

var MainRouter = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Login}/> 
    <Route path='/home' getData={getData} compnent={App}/>
  </Router>
)