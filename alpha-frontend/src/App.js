import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { HomePage, ProfilPage } from './pages';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        <Route path="/" exact component={HomePage}/>
        <Route path="/profil" component={ProfilPage}/>
      </div>
     );
  }
}
 
export default App ;