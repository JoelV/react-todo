import React, { Component } from 'react';
import './App.css';
import { Navbar, Grid, Row, Col, Button} from 'react-bootstrap';
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import * as R from 'ramda';

function buildTodos(allTodos) {
  const completedTodos = R.filter(todo => todo.isDone === true, allTodos)
  const todos = R.reject(todo => todo.isDone === true, allTodos)

  return {
    completedTodos,
    todos
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      completedTodos: []
    }
    this.updateTodos = this.updateTodos.bind(this)
    this.flipIsDone = this.flipIsDone.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
  }
  componentWillMount() {
    fetch('/api/todo')
      .then(r => {
        return r.json()
      })
      .then(allTodos => {
        this.setState(buildTodos(allTodos))
      })
  }
  updateTodos(newTodo) {
    this.setState({ todos: [...this.state.todos, newTodo]})
  }
  flipIsDone(todo) {
    if(todo.isDone === false) {
      const id = todo.id
      const flippedTodo = R.assoc('isDone', !todo.isDone, todo)
      fetch('/api/todo/' + flippedTodo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flippedTodo)
      })
        .then(() => {
          const updatedTodo = R.reject(todo => todo.id === id, this.state.todos)
          const updatedCompletedTodo = R.concat([flippedTodo], this.state.completedTodos)
          this.setState({ todos: updatedTodo, completedTodos: updatedCompletedTodo })
        })
    } else {
      const id = todo.id
      const flippedTodo = R.assoc('isDone', !todo.isDone, todo)
      fetch('/api/todo/' + flippedTodo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flippedTodo)
      })
        .then(() => {
          const updatedTodo = R.concat([flippedTodo], this.state.todos)
          const updatedCompletedTodo = R.reject(todo => todo.id === id, this.state.completedTodos)
          this.setState({ todos: updatedTodo, completedTodos: updatedCompletedTodo })
        })
    }
  }

  clearCompleted(e) {
    fetch('/api/todo/bulk/delete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.completedTodos)
    })
      .then(r => {
        this.setState({ completedTodos: [] })
      })
  }
  
  render() {
    return (
      <div>
        <Navbar style={{'background-color': '#057A07'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home" style={{'color':'#FFFFFF'}}>Raspberry PI Todo</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container">
          <Grid>
            <Row>
              <Col md={8}>
                <TodoAdd todos={this.state.todos} updateTodos={this.updateTodos}></TodoAdd>
              </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Col md={8}>
                <TodoList todos={this.state.todos}
                          flipIsDone={this.flipIsDone}/>
              </Col>
            </Row>
            <Row>
              <Col md={1}>
                <Button style={{'background-color': '#ED7B64'}} onClick={this.clearCompleted}>Clear Completed</Button>
              </Col>
            </Row>
            <Row>
              <Col md={8} style={{marginTop:'10px'}}>
                <TodoList todos={this.state.completedTodos}
                          flipIsDone={this.flipIsDone}/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}


export default App;
