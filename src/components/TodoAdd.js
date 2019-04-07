import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class TodoAdd extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { todoText: '' }
  }
  handleChange(e) {
    this.setState({ todoText: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      todo: this.state.todoText,
      isDone: false
    }
    fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo)
    })
      .then((r) => {
        return r.json()
      })
      .then(r => {
        console.log(r)
        this.props.updateTodos(r)
      })
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Create Todo</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
            onChange={this.handleChange}
            value={this.state.todoText}
          />
      </FormGroup>
      <Button type="submit">Create Todo</Button>
    </form>
    );
  }
}


export default TodoAdd;
