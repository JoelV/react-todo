import React, { Component } from 'react';
import './App.css';
import { Navbar, Grid, Row, Col} from 'react-bootstrap';
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'
import * as R from 'ramda';


const byDone = R.groupBy((todo) => {
  if(todo.isDone === true) {
    return 'isDone';
  } else {
    return 'notDone'
  }
});
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [{ id: 1, todo: 'get your shit together', isDone: true },
              { id: 2, todo: 'foo bar', isDone: false }]
    }
    this.updateTodos = this.updateTodos.bind(this)
    this.flipIsDone = this.flipIsDone.bind(this)
    this.orderTodos = this.orderTodos.bind(this)
  }
  updateTodos(newTodo) {
    this.setState({ todos: [...this.state.todos, newTodo]})
  }
  flipIsDone(todo) {
    const index = R.findIndex(R.propEq('id', todo.id))(this.state.todos)
    this.setState({ todos: R.assocPath([index, 'isDone'], !todo.isDone, this.state.todos) })
  }
  orderTodos(todos) {
    const splittedTodos = byDone(todos)
    const notDone = splittedTodos.notDone || []
    const isDone = splittedTodos.isDone || []
    return R.concat(notDone, isDone)
  }
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Todo</a>
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
              <Col md={4}>
                <TodoList todos={this.orderTodos(this.state.todos)}
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
