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
    this.state = {};
    this.state.question = '';
    this.state.choice1 = '';
    this.state.choice2 = '';
    this.state.choice3 = '';
    this.state.choice4 = '';
    this.state.answer = 0;

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Question submitted', this.state);
    this.props.toggleModalClick();
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
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

              <form onSubmit={this.handleSubmit.bind(this)} >
                <FormGroup>
                  <ControlLabel>Question</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'question')} value={this.state.question} placeholder="Question" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 1</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice1')} value={this.state.choice1} placeholder="Answer 1" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 2</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice2')} value={this.state.choice2} placeholder="Answer 2" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 3</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice3')} value={this.state.choice3} placeholder="Answer 3" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 4</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice4')} value={this.state.choice4} placeholder="Answer 4" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 4</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice4')} value={this.state.choice4} placeholder="Answer 4" />
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
