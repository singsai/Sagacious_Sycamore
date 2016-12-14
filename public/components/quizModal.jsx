var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

class ModalInstance extends React.Component {
  constructor(props) {
    super(props);

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
              <p>some question about React</p>

              <h4>Answer Choices:</h4>
              <Button bsStyle="primary">Answer 1</Button>
              <p>Some more text</p>
              <Button bsStyle="primary">Answer 2</Button>
              <p>Some more text</p>
              <Button bsStyle="primary">Answer 3</Button>
              <p>Some more text</p>
              <Button bsStyle="primary">Answer 4</Button>
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