var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

class ModalInstance extends React.Component {
  constructor(props) {
    super(props);
  }

//localhost:3000/api/question
  componentDidMount() {
    this.props.getQuestion();
  }

  render() {

    return (
      <div>
        <div>
          <Button bsStyle="primary" bsSize="small" onClick={this.props.toggleModalClick} >
            Coding practice
          </Button>
        </div>
        <div>
          <Modal show={this.props.showModal} onHide={this.props.toggleModalClick}>
            <Modal.Header closeButton>
              <Modal.Title>Coding practice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>React Coding Challenge</h4>
              <p>{this.props.question.question}</p>

              <h4>Answer Choices:</h4>
              <Button bsStyle="primary" value="1" onClick={this.props.pickAnswer}>{this.props.question.choice1}</Button>
              <p>Some more text</p>
              <Button bsStyle="primary" value="2" onClick={this.props.pickAnswer}>{this.props.question.choice2}</Button>
              <p>Some more text</p>
              <Button bsStyle="primary" value="3" onClick={this.props.pickAnswer}>{this.props.question.choice3}</Button>
              <p>Some more text</p>
              <Button bsStyle="primary" value="4" onClick={this.props.pickAnswer}>{this.props.question.choice4}</Button>
              <p>Some more text</p>
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
