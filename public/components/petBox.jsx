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
              <b>Name:</b> {props.pet.name}
            </div>
            <div className='row'>
              <b>Mood:</b> {props.pet.mood}
            </div>
            <div className='row'>
              <b>Phys:</b> {props.pet.phys}
            </div>
            <div className='row'>
              <b>Level:</b> {props.pet.level} / 3
              <div className='progress'>
                  <div className="progress-bar" role="progressbar" style={progressStyle}>
                  </div>
              </div>
             <span className="sr-only">10% Complete</span>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

window.Petbox = Petbox;