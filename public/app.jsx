class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      mood: null,
      level: 0,
      phys: null,
      img: null,
      status: null,
      health: 0,
      experience: 0,
      feed: 0,
      love: 0,
      showModal: false,
      showNewName: false,
      cmdImg: {
        food:'../assets/food1.png',
        sleep:'../assets/sleep1.png',
        love:'../assets/love1.png',
        code:'../assets/code1.png'
      },
      logs: []
    }

    var that = this;
    setInterval(function() {
      if (that.state.status !== 'dead') {      
        that.getCurrent();
        that.getLog();
      }
    }, 2000);
  }

  componentWillMount() {
    this.getCurrent();
    this.getLog();
  }

  getCurrent() {
    console.log('Fetching pet status...');
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
            health: data.health,
            experience: data.experience,
            feed: data.feed,
            status: data.status,
            love: data.love,
            showNewName: false,
            newPetName: ''
          });
        });
    });
  }

  getLog() {
    console.log('Fetching log messages...');
    var that = this;
    fetch('http://localhost:3000/log', {method: 'GET'})
      .then(function(parse) {
        parse.json()
        .then(function (data) {
          that.setState({
            logs: data
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
      console.log('Pet status updated!');
      that.getCurrent();
    })
  }

  getInput(event) {
    var key = event.target.getAttribute('class');
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  showNameInput(){
    this.setState({
      showNewName: !this.showNewName
    });
  }

  newPet(e) {
    e.preventDefault();
    
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/newPet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {name: this.state.newPetName}
    })
    .success(function() {
      console.log('New pet created!');
      that.getCurrent();
    })
  }


  changeCommandIcon (command) {
    if (command === 'eating') {
      this.setState({cmdImg: {
          food:'../assets/food2.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love1.png',
          code:'../assets/code1.png'
        }})
        ;
    } else if (command === 'sleeping') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep2.png',
          love:'../assets/love1.png',
          code:'../assets/code1.png'
        }});
    } else if (command === 'coding') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love1.png',
          code:'../assets/code2.png'
        }});
    } else if (command === 'playing') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love2.png',
          code:'../assets/code1.png'
        }});
    }
  }
  
  executeCommand(command){
    this.changeCommandIcon(command);
    this.setStatus(command)
    this.getCurrent();
  }

  submitAnswer() {
    console.log('Answer submitted');
    this.toggleModal(); 
  }

  getQuestion() {
    // get request to /api/question to update /fill array of 3 questions
  }

  toggleModal() {
    console.log('toggle called');
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    return (
      <div className='app container'>
        <div className='row'>
          <NavigationBar />
        </div>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <h3>{this.state.name} is currently <span className='status'>{this.state.status}</span>!</h3>
            <div>
              <Petbox pet={this.state}/>
            </div>
            <h3>Actions</h3>
            <div className='PetCommand'>{
              this.state.status !== 'dead' ? (<div>
                <PetCommand cmdImg={this.state.cmdImg} executeCommand={this.executeCommand.bind(this)} />
              </div>) : <Restart showNameInput={this.showNameInput.bind(this)} showNewName={this.state.showNewName} getInput={this.getInput.bind(this)} newPet={this.newPet.bind(this)}></Restart>
            }</div>
          </div>
          <div>
            <ModalInstance showModal={this.state.showModal} toggleModalClick={this.toggleModal.bind(this)} submitAnswer={this.submitAnswer.bind(this)}></ModalInstance>
          </div>
        </div>
      </div>
    )
  }
}

window.App = App;