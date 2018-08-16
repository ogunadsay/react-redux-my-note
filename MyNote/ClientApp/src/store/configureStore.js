import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import NotesReducer from './Notes';

export default function configureStore() {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)

    return createStore(
        NotesReducer,
        composedEnhancers
    );
}

//export default function configureStore(history, initialState) {
//    const reducers = {
//        notesReducer: NotesReducer
//    };
//  const middleware = [
//    thunk,
//    routerMiddleware(history)
//  ];

//  // In development, use the browser's Redux dev tools extension if installed
//  const enhancers = [];
//  const isDevelopment = process.env.NODE_ENV === 'development';
//  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
//    enhancers.push(window.devToolsExtension());
//  }

//  const rootReducer = combineReducers({
//    ...reducers,
//    routing: routerReducer
//  });

//  return createStore(
//    rootReducer,
//    initialState,
//    compose(applyMiddleware(...middleware), ...enhancers)
//  );
//}
