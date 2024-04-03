import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, Reducer } from 'redux';

export interface State {
  selected: string;
}

export interface Action {
  type: string;
  val: string;
}

const initialState: State = {
  selected: 'GARAGE',
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_PAGE':
      return { ...state, selected: action.val };
    default:
      return state;
  }

};

export const store = createStore(reducer);

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    root
  );
}

reportWebVitals();