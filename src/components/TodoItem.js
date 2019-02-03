import React, { Component } from 'react';
import { ListGroupItem, Checkbox } from 'react-bootstrap'
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };
    this.handleCheckChanged = this.handleCheckChanged.bind(this)
    this.showTodo = this.showTodo.bind(this)
  }
  handleCheckChanged(e) {
    this.props.flipIsDone(this.props.todo)
  }
  showTodo(todo) {
    if (todo.isDone === true) {
      return <del>{todo.todo}</del>
    } else {
      return (todo.todo)
    }
  }
  render() {
    return (
      <ListGroupItem>
        <Checkbox checked={this.props.isDone}
                  onChange={this.handleCheckChanged}
                  >
          {this.showTodo(this.props.todo)}
        </Checkbox>
      </ListGroupItem>
    );
  }
}


export default TodoItem;
