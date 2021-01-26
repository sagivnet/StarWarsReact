import './App.css';
import { Header } from './components/Header';
// import { useState } from 'react';
import { Home } from './components/Home';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Description } from './components/Description';

function App() {


  // const [currentScreen, setCurrentScreen] = useState('Home'); //  Home / Description
  
 
  
  return (
    <Router>

    <div >
    {/* <div className="container"> */}
      <Header />

<Switch>
    <Route path='/films/:id' component={Description} />
    <Route path='/films' component={Home} />
    <Route path='/people/:id' component={Description} />
    <Route path='/planets/:id' component={Description} />
    <Route path='/starships/:id' component={Description} />
    <Route path='/vehicles/:id' component={Description} />
    <Route path='/species/:id' component={Description} />
    
    <Route path='/'  component={()=><Redirect to='/films' />} />
    <Route path='*'  component={()=><Redirect to='/' />} />
    {/* <Route path='*' component={Home} /> */}
    {/* <Route path='/films' component={Home} /> */}

</Switch>
    </div>
    </Router>
  );
}

export default App;
