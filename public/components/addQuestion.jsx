var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var HelpBlock = ReactBootstrap.HelpBlock;
var FieldGroup = ReactBootstrap.FieldGroup;

class AddQuestionModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Question submitted', event);
  }

  render() {

    return (
      <div>
        <div>
          <Button bsStyle="primary" bsSize="small" onClick={this.props.toggleModalClick} >
            Add Question
          </Button>
        </div>
        <div>
          <Modal show={this.props.showModal} onHide={this.props.toggleModalClick}>

              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="formControlsQuestion">
                  <ControlLabel>Question</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Question" />
                </FormGroup>
                <FormGroup controlId="formControlsAnswer1">
                  <ControlLabel>Answer 1</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Answer 1" />
                </FormGroup>
                <FormGroup controlId="formControlsAnswer2">
                  <ControlLabel>Answer 2</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Answer 2" />
                </FormGroup>
                <FormGroup controlId="formControlsAnswer3">
                  <ControlLabel>Answer 3</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Answer 3" />
                </FormGroup>
                <FormGroup controlId="formControlsAnswer4">
                  <ControlLabel>Answer 4</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="Answer 4" />
                </FormGroup>

                <Button type="submit">
                  Submit
                </Button>
              </form>

          </Modal>
        </div>
      </div>
    );
  }
}

window.AddQuestionModal = AddQuestionModal;
