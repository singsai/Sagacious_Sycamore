class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navigation navbar navbar-dark bg-primary">
          <span className="navbar-brand">Welcome to HRGotchi, {browserHistory.currentUser}!</span>
          <span className="float-xs-right navbar-text"><button className="btn btn-sm btn-outline-success">Logout</button></span>
        </nav>
      </div>
    )
  }
} 

window.NavigationBar = NavigationBar;