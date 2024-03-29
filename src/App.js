import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/homepage';
import AuthComponent from './login';
import Addactivitylist from './components/addactivitylist';
import Activitylist from './components/activitylist';
import Worklist from './components/worklist';
import Addworklist from './components/addworklist';
import Donework from './components/donework';
import WeekChart from './components/weekchart';
import MonthChart from './components/monthchart';
import Prf from './components/prf';

function App() {
  return (
   <div>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/auth">
          <AuthComponent/>
        </Route>
        <Route exact path="/addactivitylist">
          <Addactivitylist/>
        </Route>
        <Route exact path="/activitylist">
          <Activitylist/>
        </Route>
        <Route exact path="/worklist">
          <Worklist/>
        </Route>
        <Route exact path="/addworklist">
          <Addworklist/>
        </Route>
        <Route exact path="/donework/:id">
          <Donework/>
        </Route>
        <Route exact path="/weekchart">
          <WeekChart/>
        </Route>
        <Route exact path="/monthchart">
          <MonthChart/>
        </Route>
        <Route exact path="/profile">
            <Prf/>
        </Route>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
