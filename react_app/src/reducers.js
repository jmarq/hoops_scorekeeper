import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';


export function playsReducer(state=[], action) {
	switch(action.type) {
		case 'ADD_PLAY':
			return [...state, Object.assign({}, action.playObject)];
		case 'UNDO_PLAY':
			return state.slice(0, -1);
		case 'RESET_GAME':
			return [];
		default:
			return state;
	}
}

export let defaultSettings = {
	gamePoint: 15,
	pointValues: {'two': 1, 'three': 2},
	teamNames: ['Shirts', 'Skins'],
};

export function settingsReducer(state=defaultSettings, action) {
	console.log("settings reducer")
	switch(action.type) {
		case 'UPDATE_SETTINGS':
			return Object.assign({}, action.settingsObject);
		case 'RESET_SETTINGS':
			return Object.assign({}, defaultSettings);
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	plays: playsReducer,
	settings: settingsReducer,
	form: formReducer,
});
