// fake data for testing - should represent http.get
var fakeData = {
  name: 'Chad',
  mood: 'happy',
  level: 1,
  phys: 'hungry',
  img: 'http://i.imgur.com/g3D5jNz.jpg',
  status: 'normal'
}

// function that handles response from server
var getData = function(data, cb){
  cb(data);
}

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

  componentDidMount(){
    // get request to server and set current state with response
    this.props.getData(fakeData, this.getCurrentState.bind(this))
  }

  render() {
    return (
      <div>
        <div>Hello world test again</div>
        <petBox />
        <petCommands>
      </div>
    )
  }
}


        {this.props.getData}
        {this.state.name}
        <div className='container'>
          <div className='row'>
            <div className='image col-md-6'>
              <img src={this.state.img}></img>
            </div>
            <div className='stats col-md-3'>
              <h1>Stats</h1>
              <ul>
                <li>Name: {this.state.name}</li>
                <li>Mood: {this.state.mood}</li>
                <li>Level: {this.state.level}</li>
                <li>Phys: {this.state.phys}</li>
              </ul>
            </div>
            <span className='glyphicon glyphicon-heart'></span>
          </div>
        </div>



window.App = App;

ReactDOM.render(<App getData={getData}/>, document.getElementById('app'))