import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    return (
      <div>
      <ul>
        {this.props.todos.map(todo =>
          (<li key={todo.id}>{todo.todo}</li>)
        )}
      </ul>
      </div>
    );
  }
}


export default TodoList;
