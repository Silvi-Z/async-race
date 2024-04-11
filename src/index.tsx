import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, Reducer } from 'redux';

export interface State {
  selected: string;
  cars: any,
  total: string,
  best: Array<any>
}

export interface Action {
  type: string;
  val: string;
  value: Array<any>
}

const initialState: State = {
  selected: 'GARAGE',
  cars: [],
  total: '',
  best: []
};

const reducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_PAGE':
      return { ...state, selected: action.val };
    case 'CARS':
      return { ...state, cars: action.val };
    case 'TOTAL':
      return { ...state, total: action.val };
      case 'BEST':
        return { ...state, best: [...state.best, action.value]};
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