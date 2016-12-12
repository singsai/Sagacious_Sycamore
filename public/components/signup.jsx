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
    
    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/signup',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {username: that.state.username, password: that.state.password}
    })
    .success(function(res) {
      if (!res) {
        console.log('user already exists');
        that.props.router.push('/login');
      } else {
        console.log('post to signup successful');
        that.props.router.push('/home');
      };

    });
  }

  handleInput(e){
    var key = e.target.getAttribute("id");
    var temp = {};
    temp[key] = e.target.value;
    this.setState(temp);
  }

  render() {
    return (
      <div className='signup-box container'>
        <form className='form-signin' onSubmit={this.handleSubmit.bind(this)}>
          <h2 className='form-signin-header'>HR50 Sign Up</h2>
          <label><input onChange={this.handleInput.bind(this)} type='text' id='username' className='form-control' placeholder='Enter username'></input></label>
          <label><input onChange={this.handleInput.bind(this)} type='password' id='password' className='form-control' placeholder='Enter password'></input></label>
          <button className='btn btn-large btn-primary btn-block' type='submit'>Submit</button>
        </form>
        <Link to='login'>Already have an account? Click here</Link>
      </div>
    )
  }
}

window.SignUp = SignUp;