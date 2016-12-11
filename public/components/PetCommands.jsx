var PetCommand = (props) => (
  <div className="pet-commandbar">
    <img className='command' src={props.cmdImg.food} onClick={function (){props.executeCommand('eating')}}/>
    <img className='command' src={props.cmdImg.love} onClick={function (){props.executeCommand('playing')}}/>
    <img className='command' src={props.cmdImg.code} onClick={function (){props.executeCommand('coding')}}/>
    <img className='command' src={props.cmdImg.sleep} onClick={function (){props.executeCommand('sleeping')}}/>
  </div> 
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.PetCommand = PetCommand;





