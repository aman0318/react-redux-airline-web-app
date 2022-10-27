import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './modules/home/homePage'
import React  from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './sass/app.sass';

function App() {

  return (
    <Provider store={store}>
    <div className="App">
        <HomePage></HomePage>
    </div>
    </Provider>
  );
}

export default App;
