// image generator with different icons based on pet mood
var imgSrc = {
  normal: "http://i.imgur.com/RzBy3Vw.gif",
  sleep: "http://i.imgur.com/PujjsmB.gif",
  code: "http://i.imgur.com/KTNujjY.gif",
  happy: "http://i.imgur.com/jjUbQ6P.gif",
  feed: "http://i.imgur.com/W8UQN1M.gif",
  runaway: "http://i.imgur.com/JfH45R0.jpg",
  dead: "http://i.imgur.com/3tWT7qP.jpg",
  sick: "http://i.imgur.com/CdIG2m2.gif",
  play: "http://i.imgur.com/T99KqDs.gif"
}


var Image = function(props) {
  var icon = props.icon;
  var levelProgress = props.level * 10 + '%';

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


var Petbox = (props) => {
  // progress bar that represents level
  var progressStyle = {
    width: props.pet.level/3 * 100 + '%'
  }

  var currentImage = imgSrc[props.pet.status]

  return (
  <div className='petView container'>
    <div className='row'>
      <div className='pet-image-container col-md-6 col-xs-6'>
        <img className="pet-image" src={currentImage}></img>
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