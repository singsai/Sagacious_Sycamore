var Log = (props) => (
  <div>{
    props.logs.map(function(log, index){return (<span key={index}>{log.name +' is ' + log.action + ' at ' + log.createdAt}<br></br></span> )})
  }</div>
)