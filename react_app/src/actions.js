// action creators for redux

// UPDATE_SETTINGS
export function updateSettings(settingsObject) {
	return {
		type: 'UPDATE_SETTINGS',
		settingsObject: settingsObject,
	};
}

export function resetSettings() {
	return {
		type: 'RESET_SETTINGS',
	};
}

// ADD_PLAY
export function addPlay(playObject) {
	return {
		type: 'ADD_PLAY',
		playObject: playObject,
	};
}

// UNDO_PLAY
export function undoPlay() {
	return {
		type: 'UNDO_PLAY',
	};
}

// RESET_GAME
export function resetGame() {
	return {
		type: 'RESET_GAME',
	};
}

export function acknowledgeEndGame() {
	return {
		type: 'ACKNOWLEDGE_ENDGAME',
	}
}

export function resetEndGame(){
	return {
		type: 'RESET_ENDGAME',
	}
}

export function changeTab(tabName){
	return {
		type: 'CHANGE_TAB',
		targetTab: tabName,
	}
}

// change tab?

// acknowledge endgame?
