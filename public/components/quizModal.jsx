var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var lines = this.props.question.arr;
    var content = {
        __html: lines ? lines.join('<br />') : ''
    };
        // return ();
      return (
        <div>
          <div>
            <Modal show={this.props.showModal} onHide={this.props.toggleModalClick}>
              <Modal.Header closeButton>
                <Modal.Title>Coding practice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>React Coding Challenge</h4>
                {/* {this.props.question.arr.map(function(item) {
                  {console.log(item)}
                  <span>
                    {item}
                    <br/>
                  </span>
                })} */}
                <div dangerouslySetInnerHTML={ content }/>
                {/* <p>{this.props.question.question}</p> */}
                <h4>Answer Choices:</h4>
                <Button bsStyle="primary" value="1" onClick={this.props.pickAnswer}>A</Button>
                <p>{this.props.question.choice1}</p>
                <Button bsStyle="primary" value="2" onClick={this.props.pickAnswer}>B</Button>
                <p>{this.props.question.choice2}</p>
                <Button bsStyle="primary" value="3" onClick={this.props.pickAnswer}>C</Button>
                <p>{this.props.question.choice3}</p>
                <Button bsStyle="primary" value="4" onClick={this.props.pickAnswer}>D</Button>
                <p>{this.props.question.choice4}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.submitAnswer}>Submit</Button>

              </Modal.Footer>
            </Modal>
          </div>
        </div>
      );
  }
}

window.ModalInstance = ModalInstance;
