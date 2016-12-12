var StatusMessage = function(props) {
  var message = 'Don\'t forget about me!';

  switch (props.petState.status) {
    case 'dead':
      message = 'YOU KILLED ME';
      break
    case 'coding':
      message = 'I can level up by coding!';
      break;
    case 'eating':
      message = 'NOM NOM NOM NOM';
      break;
    case 'sleeping':
      message = '1 sheep. 2 sheep. 3 sheep.';
      break;
    case 'playing':
      message = 'PLAY ALL DAY! EVERYDAY!';
      break;
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
