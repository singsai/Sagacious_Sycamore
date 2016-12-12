var StatusMessage = function(props) {
  var message = 'Code to level up!';

  if (props.petState.status === 'dead') {
    message = 'YOU KILLED ME'
  } else {
    message = 'I can level up by coding!'
  }

  return (
    <div>
      Message from {props.petState.name}: 
      <br></br>
      <div className="status-message">
      {message}<span className="underscore">_</span>
      </div>
    </div>
    )
}
