// /login, /logout, /signup
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  handleSubmit(e){
    e.preventDefault();
    console.log(this.state)
    fetch('https://localhost:3000', {
      method: 'post'
    }).then(function(response) {
      console.log('got response!')
    }).catch(function(err) {
      console.error(err);
    })
  }

  handleUserChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e){
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div className='signin-box container'>
        <form className='form-signin' onSubmit={this.handleSubmit}>
          <h2 className='form-signin-header'>HR50 Sign In</h2>
          <label><input onChange={this.handleUserChange} type='text' id='username' className='form-control' placeholder='Enter username'></input></label>
          <label><input onChange={this.handlePasswordChange} type='text' id='password' className='form-control' placeholder='Enter password'></input></label>

          <label><input type='checkbox' value='remember-me' /> Remember Me </label>
          <button className='btn btn-large btn-primary btn-block' type='submit'>Submit</button>
        </form>
        <a href="/home">Home</a>
      </div>
    )
  }
}

window.Login = Login;