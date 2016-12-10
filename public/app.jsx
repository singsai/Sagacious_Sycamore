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
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/pet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {status: status}
    })
    .success(function() {
      console.log('ajax succeeded');
      that.getCurrent();
    })
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
              <button onClick={this.setStatus.bind(this, 'feeding')}>Feed</button>
              <button onClick={this.setStatus.bind(this, 'coding')}>Code</button>
              <button onClick={this.setStatus.bind(this, 'sleeping')}>Sleep</button>
              <button onClick={this.setStatus.bind(this, 'playing')}>Play</button>
          </div>
        </div>
      </div>
    )
  }
}

window.App = App;