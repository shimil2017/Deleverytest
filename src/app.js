import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist';
import Route from './routes'
import reducers from './store/store'
import ReduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const store = createStore(
      reducers,
      undefined,
      compose(
        applyMiddleware(ReduxThunk),
        autoRehydrate()
      )
    )
    persistStore(store, { storage: AsyncStorage });
    return(
      <Provider store={store}>
          <Route/>
      </Provider>
    );
  }
}
export default App;
