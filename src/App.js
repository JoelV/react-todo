import React, { Component } from 'react';
import './App.css';
import { Navbar, Grid, Row, Col} from 'react-bootstrap';
import TodoList from './components/TodoList'
import TodoAdd from './components/TodoAdd'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [{ id: 1, todo: 'get your shit together' },
              { id: 2, todo: 'foo bar' }]
    }
    this.updateTodos = this.updateTodos.bind(this)
  }
  updateTodos(newTodo) {
    this.setState({ todos: [...this.state.todos, newTodo]})
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
                <TodoList todos={this.state.todos}></TodoList>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}


export default App;
