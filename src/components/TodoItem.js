import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap'
class TodoItem extends Component {
  render() {
    return (
      <ListGroupItem key={this.props.id}>{this.props.todo.todo}</ListGroupItem>
    );
  }
}


export default TodoItem;
