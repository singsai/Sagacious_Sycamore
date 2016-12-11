// /login, /logout, /signup
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(user)
    }).then(function(response) {
      console.log('got response!')
    }).catch(function(err) {
      console.error(err);
    })
  }

  handleInput(e){
    var key = event.target.getAttribute("id");
    var temp = {};
    temp[key] = e.target.value;
    this.setState(temp);
  }

  render() {
    return (
      <div className='signup-box container'>
        <form className='form-signin' onSubmit={this.handleSubmit}>
          <h2 className='form-signin-header'>HR50 SignUp</h2>
          <label><input onChange={this.handleInput} type='text' id='username' className='form-control' placeholder='Enter username'></input></label>
          <label><input onChange={this.handleInput} type='password' id='password' className='form-control' placeholder='Enter password'></input></label>
          <button className='btn btn-large btn-primary btn-block' type='submit'>Submit</button>
        </form>
        <a href="/home">Home</a>
      </div>
    )
  }
}

window.SignUp = SignUp;

// ReactDOM.render(<SignUp data={data}/>, document.getElementById('app'));