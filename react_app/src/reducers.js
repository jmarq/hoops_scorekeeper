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
	winByTwo: true,
};

export function settingsReducer(state=defaultSettings, action) {
	switch(action.type) {
		case 'UPDATE_SETTINGS':
			return Object.assign({}, action.settingsObject);
		case 'RESET_SETTINGS':
			return Object.assign({}, defaultSettings);
		default:
			return state;
	}
}

export function endGameReducer(state=false, action) {
	switch(action.type) {
		case 'ACKNOWLEDGE_ENDGAME':
			return true;
		case 'RESET_ENDGAME':
			return false;
		case 'RESET_GAME':
			return false;
		case 'UPDATE_SETTINGS':
			return false;
		case 'RESET_SETTINGS':
			return false;
		case 'UNDO_PLAY':
			return false;
		default:
			return state;
	}
}

export function tabReducer(state="setup", action) {
	switch(action.type) {
		case 'CHANGE_TAB':
			return action.targetTab;
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	plays: playsReducer,
	settings: settingsReducer,
	endGameAcknowledged: endGameReducer,
	activeTab: tabReducer,
	form: formReducer,
});
