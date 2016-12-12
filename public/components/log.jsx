var Log = (props) => (
  <div>{
    props.logs.slice(props.logs.length - 15).map(function(log, index){return (<span key={index}>{log.name +' is ' + log.action + ' at ' + log.createdAt}<br></br></span> )})
  }</div>
)