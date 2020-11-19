import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {compose, createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {postsReducer} from "./store/reducers/postsReducer";
import {usersReducer} from "./store/reducers/usersReducer";
import {commentsReducer} from "./store/reducers/commentsReducer";

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer
});

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('stateForum', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};


const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('stateForum');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const middleware = [thunkMiddleware, routerMiddleware(history)];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
