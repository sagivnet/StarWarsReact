import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Description } from './components/Description';

function App() {
  return (
    <Router>
        <Header />
        <div className="container">
          <Switch>
              <Route path='/films/:id' component={Description} />
              <Route path='/films' component={Home} />
              <Route path='/people/:id' component={Description} />
              <Route path='/planets/:id' component={Description} />
              <Route path='/starships/:id' component={Description} />
              <Route path='/vehicles/:id' component={Description} />
              <Route path='/species/:id' component={Description} />
              <Redirect strict from="/" to="/films"/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
