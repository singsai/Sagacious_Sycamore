var fakeData = {
  name: 'Chad',
  mood: 'happy',
  level: 1,
  phys: 'hungry',
  img: 'http://i.imgur.com/g3D5jNz.jpg'
}


class App extends React.Component {
  constructor(props){
    super(props);
    console.log('props')
    this.state = {
      name: null,
      mood: null,
      level: 0,
      phys: null,
      img: null
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <div>Hello world test again</div>
        {this.props.pet.name}
        <div className='image'>
          <img src={this.props.pet.img}></img>
        </div>
      </div>
    )
  }
}





window.App = App;

ReactDOM.render(<App pet={fakeData}/>, document.getElementById('app'))