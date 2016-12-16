var Alert = ReactBootstrap.Alert;
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      user: 'TestUSer8',
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
      showAddQuestionModal: false,
      question: '',
      showNewName: false,
      answer: '',
      alertVisible: false,
      answerCorrect: null,
      cmdImg: {
        food:'../assets/food1.png',
        sleep:'../assets/sleep1.png',
        love:'../assets/love1.png',
        code:'../assets/code1.png'
      },
      logs: []
    }

    // this.handleAlertDismiss.bind(this);
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
    this.getQuestion();
  }

  getCurrent() {
    console.log('Fetching pet status...', this.state.user);
    var that = this;
    $.ajax({
      method: 'POST',
      url: '/api/petstatus',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {user: this.state.user}
    })
    .success(function(data) {
       that.setState(data);
    });
  }

  getLog() {
    console.log('Fetching log messages...');
    var that = this;
    $.ajax({
      method: 'POST',
      url: '/log',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {user: this.state.user}
    })
    .success(function(data) {
      console
       that.setState({logs: data});
    });
  }

  setStatus(status) {
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/pet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {status: status, user: this.state.user}
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
      data: {name: this.state.newPetName, user: this.state.user}
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
  // method to call when submitting answers
  submitAnswer() {
    // console.log('Answer submitted', data.target.value);
    // var answer = this.pickAnswer();
    var that = this;
    var option = {
      id: this.state.question.id,
      answer: this.state.answer,
      user: this.state.user
    }
    // console.log('option', option);
    $.ajax({
      method: 'POST',
      url: '/api/answer',
      data: option,
      success: function(data) {
        that.setState({answerCorrect: data.correct});
        console.log('Successfully posted');
      }
    });
    this.toggleModal();
    this.getQuestion(); // Will fetch the next question
  }
  // called when user submits on the code challenge
  pickAnswer(e) {
    e.preventDefault();
    this.setState({
      answer: e.target.value
    });
    // console.log(e.target.value);
  }
  // queues the next question
  getQuestion() {
    var that = this;
    $.ajax({
      method: 'GET',
      url: '/api/question'
    })
    .success(function(data) {
      that.setState({question: data});
      console.log('fetched new question');
    })
  }
  // react-bootstrap toggle modal for challenge question
  toggleModal() {
    console.log('toggle called');
    this.setState({showModal: !this.state.showModal});
  }
  // react-bootstrap toggle for adding a challenge question
  toggleAddQuestionModal() {
    this.setState({showAddQuestionModal: !this.state.showAddQuestionModal});
    console.log('toggleQuestion called', this.state.showAddQuestionModal);
  }

  handleQuestionSubmit(event) {
    event.preventDefault();
    console.log('Question submitted', event.target);
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  // handleAlertShow() {
  //   this.setState({alertVisible: true});
  // }

  render() {
    let answerMessage;

    var bsStyle = 'info';
    var style = {
      display: 'none'
    }

    if (this.state.answerCorrect) {
      bsStyle = 'success';
      style.display = 'block';
      answerMessage = 'Good job';
    } else if (this.state.answerCorrect === false) {
      bsStyle = 'danger';
      style.display = 'block';
      answerMessage = 'Nice try, but wrong';

    } else {
      answerMessage = '';
    }

    return (
      <div className='app container'>
        <div className='row'>
          <NavigationBar />
        </div>
        <div className='row'>
          <div className='col-md-12 col-xs-12'>
            <h3>{this.state.name} is currently <span className='status'>{this.state.status}</span>!</h3>
            <Alert bsStyle={bsStyle} style={style} onDismiss={this.handleAlertDismiss.bind(this)}>
              {answerMessage}
            </Alert>
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
            <ModalInstance
              showModal={this.state.showModal}
              pickAnswer={this.pickAnswer.bind(this)}
              toggleModalClick={this.toggleModal.bind(this)}
              submitAnswer={this.submitAnswer.bind(this)}
              question={this.state.question}
            ></ModalInstance>
            <AddQuestionModal showModal={this.state.showAddQuestionModal} toggleModalClick={this.toggleAddQuestionModal.bind(this)} handleSubmit={this.handleQuestionSubmit.bind(this)}></AddQuestionModal>
          </div>
        </div>
      </div>
    )
  }
}

window.App = App;
