import React, { Component } from 'react';
import { ListGroupItem, Checkbox } from 'react-bootstrap'
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };
    this.handleCheckChanged = this.handleCheckChanged.bind(this)
  }
  handleCheckChanged(e) {
    this.setState({ isDone: !this.state.isDone })
  }
  render() {
    return (
      <ListGroupItem>
        <Checkbox checked={this.state.isDone}
                  onChange={this.handleCheckChanged}>
          {this.props.todo.todo}
        </Checkbox>
      </ListGroupItem>
    );
  }
}


export default TodoItem;
