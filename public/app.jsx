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

  componentWillMount() {
    this.getCurrent();
  }

  getCurrent() {
    var that = this;
    fetch('http://localhost:3000/api/pet', {method: 'GET'})
      .then(function(parse) {
      parse.json()
        .then(function (data) {
        that.setState({
          name: data.name, 
          mood: data.mood, 
          level: data.level, 
          phys: data.phys, 
          img: data.img, 
          status: data.status 
        });
      });
    });
  }
  
  setStatus(status) {
    this.setState({
      status: status
    });


    // fetch('http://localhost:3000/api/pet', {
    //   method: 'POST',
    //   data: data
    // }).then(function() {
    //   console.log('updated status');
    // }).catch(function(err) {
    //   console.err(err);
    // }); 
  }

  render() {
    return (
      <div className='app container'>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <h3>{this.state.name} is currently <span className='status'>{this.state.status}ing</span>!</h3>
            <div>
              <Petbox pet={this.state}/>
            </div>
            <div>
              <h3>Actions</h3>
              <button onClick={this.setStatus.bind(this, 'feed')}>Feed</button>
              <button onClick={this.setStatus.bind(this, 'code')}>Code</button>
              <button onClick={this.setStatus.bind(this, 'sleep')}>Sleep</button>
              <button onClick={this.setStatus.bind(this, 'play')}>Play</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

window.App = App;