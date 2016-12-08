class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  render() {
    return (
      <div className='signin-box container'>
        <form className='form-signin'>
          <h2 className='form-signin-header'>HR50 Sign In</h2>
          <label><input type='text' id='input-user' className='form-control' placeholder='Enter username'></input></label>
          <label><input type='text' id='input-password' className='form-control' placeholder='Enter password'></input></label>

          <label><input type='checkbox' value='remember-me' /> Remember Me </label>
          <button className='btn btn-large btn-primary btn-block' type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

window.Login = Login;