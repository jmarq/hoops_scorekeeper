import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './reducers';


export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		//applyMiddleware(thunk) // thunk middleware for async actions
		);
};
