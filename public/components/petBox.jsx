// image generator with different icons based on pet mood
var Petbox = (props) => {
  // progress bar that represents level
  var progressStyle = {
    width: props.pet.level/3 * 100 + '%'
  }

  return (
  <div className='petView container'>
    <div className='row'>
      <div className='pet-image-container col-md-6 col-xs-6'>
        <img className="pet-image" src={props.pet.img}></img>
      </div>
      <div className='stats col-md-6 col-xs-6'>
        <div className='stats container'>
          <h1>Stats</h1>
            <div className='row'>
              Name: {props.pet.name} <Image icon='happy'/>
            </div>
            <div className='row'>
              Mood: {props.pet.mood} <Image icon={props.pet.mood}/>
            </div>
            <div className='row'>
              Level: {props.pet.level} / 3
              <div className='progress'>
                  <div className="progress-bar" role="progressbar" style={progressStyle}>
                  </div>
              </div>
             <span className="sr-only">10% Complete</span>
            </div>
            <div className='row'>
              Phys: {props.pet.phys} <Image icon='hsdfy'/>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

window.Petbox = Petbox;