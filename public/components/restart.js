var Restart = (props) => (
  <div>
  <button onClick={props.showNameInput}>Restart</button>
  <div>{
    props.showNewName ? (
      <form>
        <input className='newPetName' placeholder='Enter new pet name' onKeyUp={props.getInput}></input>
        <button onClick={props.newPet}>Make New Pet</button>
      </form>): null
  }</div>
  </div>
)