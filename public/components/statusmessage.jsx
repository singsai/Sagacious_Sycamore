var StatusMessage = function(props) {
  return (
    <div>
      <br></br>
      <div className="status-message">
      {props.logs.slice().map(function(log, index){return (<span key={index} class="underscore">{log.name +' is ' + log.action + ' at ' + log.createdAt}<br></br></span> )})}
      </div>
    </div>
    )
}
