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

//feed
//code
//sleep
//love
// component for main App
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: null,
      mood: null,
      level: 0,
      phys: null,
      img: null,
      status: null
    }
  }

  // set current state as new parameters received from server every time state changes
  getCurrentState(state){
    this.setState({
      name: state.name, //string 'cat'
      mood: state.mood, //string 'happy, grumpy, depressed'
      level: state.level, //int 1, 2, 10
      phys: state.phys, //string 'healthy, sick, tired, hungry'
      img: state.img, //string - url 'http'
      status: state.status //string 'coding, sleeping, eating'
    })
  }

  componentWillMount(){
    // get request to server and set current state with response
    this.props.getData(fakeData, this.getCurrentState.bind(this))
  }

  render() {
    console.log('state', this.state)

    return (
      <div className='app container'>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <h1>HRGotchi</h1>
            <div>
              <Petbox pet={this.state}/>
            </div>
            <button>Refresh</button>
          </div>
        </div>
      </div>
    )
  }
}


window.App = App;

ReactDOM.render(<App getData={getData}/>, document.getElementById('app'))