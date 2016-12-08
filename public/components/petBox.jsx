var Image = function(props) {
  var icon = props.icon;

  var o = {
    happy: function() {
      return <img className='icon' src="http://emojione.com/wp-content/uploads/assets/emojis/1f606.svg"></img>
    },
    sad: function() {
      return <img className='icon' src='http://emojione.com/wp-content/uploads/assets/emojis/1f62d.svg'></img>
    }
  }

  return o[icon]? o[icon]() : <span className='glyphicon glyphicon-thumbs-up'></span>;
}


var Petbox = (props) => (
  <div className='petView container'>
    <div className='row'>
      <div className='col-md-6 col-xs-6'>
        <img className="pet-image" src={props.pet.img}></img>
      </div>
      <div className='stats col-md-6 col-xs-6'>

        <div className='container'>
          <h1>Stats</h1>
            <div className='row'>
              Name: {props.pet.name} <Image icon='happy'/>
            </div>
            <div className='row'>
              Mood: {props.pet.mood} <Image icon={props.pet.mood}/>
            </div>
            <div className='row'>
              Level: {props.pet.level}
            </div>
            <div className='row'>
              Phys: {props.pet.phys} <Image icon='hsdfy'/>
            </div>
            <div className='progress'>
                <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{'width': '40%'}}>
    <span className="sr-only">70% Complete</span>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
)

window.Petbox = Petbox;