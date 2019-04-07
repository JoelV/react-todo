import React, { Component } from 'react';
import { ListGroupItem, Checkbox, Button, ButtonGroup, Row, Col } from 'react-bootstrap'
class TodoItem extends Component {
  constructor(props) {
    super(props);
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
    const style = this.props.todo.isDone === true? { background: 'lightgrey'} : {}
    return (
      <ListGroupItem style={style}>
        <Checkbox checked={this.props.todo.isDone}
                  onChange={this.handleCheckChanged}
                  >
            {this.showTodo(this.props.todo)}
        </Checkbox>
      </ListGroupItem>
    );
  }
}


export default TodoItem;
