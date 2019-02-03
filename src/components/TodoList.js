import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { ListGroup } from 'react-bootstrap'
class TodoList extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.todos.map(todo =>
          (<TodoItem key={todo.id} todo={todo}
                     flipIsDone={this.props.flipIsDone}/>)
        )}
      </ListGroup>
    );
  }
}


export default TodoList;
