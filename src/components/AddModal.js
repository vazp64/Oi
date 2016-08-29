import React, { Component } from 'react';
import {Row, Col, Button, Modal, FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';
import {step} from '../types/step';

export default class AddModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      
      x: 0,
      y: 0,
      z: 0,
      scale:   1,
      rotate:  0,
      rotateX: 0,
      rotateY: 0,
      content: '<div>Create Your Own Slide</div>'
    };
  }
  initState(){
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      scale:   1,
      rotate:  0,
      rotateX: 0,
      rotateY: 0,
      content: '<div>Create Your Own Slide</div>'
    });
  }
  handleClick(e){
    if (e.target.name === 'open')
      this.setState({show: true});
    else if (e.target.name === 'add')
    {
      let {actions} = this.props;
      actions.addSlide(this.state);
      
      this.initState();
      this.setState({show: false});
    }
    
  }
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const close = () => this.setState({show: false});
    const inputGroup = (_title, _name ) => (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>{_title}</InputGroup.Addon>
          <FormControl name={_name}
                       type={'text'}
                       componentClass={'input'}
                       placeholder="Set value here"
                       onChange={this.handleChange.bind(this)}
                       value={this.state[_name]}/>
        </InputGroup>
        <FormControl.Feedback />
      </FormGroup>
    );
    return (
      <span>
        <Button name="open" onClick={this.handleClick.bind(this)}>ADD</Button>
        
        <Modal show={this.state.show}
               onHide={close}
               container={this}
               aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">New Slide</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Row>
                <Col md={6}>
                  <ControlLabel>Position & Scale</ControlLabel>
                  { inputGroup('Position X', 'x') }
                  { inputGroup('Position Y', 'y') }
                  { inputGroup('Position Z', 'z') }
                  { inputGroup('Scale Size', 'scale') }
                </Col>
                <Col md={6}>
                  <ControlLabel>Rotation</ControlLabel>
                  { inputGroup('Rotation', 'rotate') }
                  { inputGroup('Rotation X', 'rotateX') }
                  { inputGroup('Rotation Y', 'rotateY') }
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ControlLabel>Content</ControlLabel>
                  <FormControl name={'content'}
                               type={'textarea'}
                               componentClass={'textarea'}
                               placeholder="Set your element here"
                               onChange={this.handleChange.bind(this)}
                               value={this.state.content}/>
                  
                </Col>
              </Row>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Cancel</Button>
            <Button name="add" onClick={this.handleClick.bind(this)}>新增</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}