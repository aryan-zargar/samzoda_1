import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/homepage';
import TodoList from './components/Todolist';
import TodoForm from './components/addTodo';
import AuthComponent from './login';
import ActivityForm from './components/activityform';
function App() {
  return (
   <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/Todo">
          <TodoList/>
        </Route>
        <Route path="/addtodo">
          <TodoForm></TodoForm>
        </Route>  
        <Route path="/auth">
          <AuthComponent/>
        </Route>
        <Route path="/addactivity">
          <ActivityForm/>
        </Route>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
