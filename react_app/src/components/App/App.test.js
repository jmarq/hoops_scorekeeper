import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import App from './App';
import PlayByPlay from '../PlayByPlay/PlayByPlay';
import ScoreControls from '../ScoreControls/ScoreControls';
import Scoreboard from '../Scoreboard/Scoreboard';
import TeamStats from '../TeamStats/TeamStats';
import ReduxSetupControls from '../SetupControls/ReduxSetupControls';
import configureMockStore from 'redux-mock-store';
import configureStore from '../../store';
import {Provider} from 'react-redux';
import {defaultSettings} from '../../reducers';
import {changeTab} from '../../actions';


describe("test basic rendering using mock store", () => {
  const mockStore = configureMockStore()


  it('renders without crashing', () => {
    let initialState = {
      settings: defaultSettings,
      plays: [],
      endGameAcknowledged: false,
      activeTab: 'plays',
    };
    let store = mockStore(initialState);
    let wrapper = mount(<Provider store={store}><App/></Provider>);
    console.log(wrapper.find(PlayByPlay).prop("plays"));
  });
});

describe("test rendering with 'real' store", () => {

  it('renders correct tabs', () => {

    let initialState = {
      settings: defaultSettings,
      plays: [],
      endGameAcknowledged: false,
      activeTab: 'setup',
    };

    let store = configureStore(initialState);
    let wrapper = mount(<Provider store={store}><App/></Provider>);

    // plays, stats, score, setup
    store.dispatch(changeTab('plays'));
    expect(wrapper.find(PlayByPlay).length).toEqual(1);

    store.dispatch(changeTab('stats'));
    expect(wrapper.find(TeamStats).length).toEqual(2);

    store.dispatch(changeTab('score'));
    expect(wrapper.find(ScoreControls).length).toEqual(2);
    expect(wrapper.find(Scoreboard).length).toEqual(1);

    store.dispatch(changeTab('setup'));
    expect(wrapper.find(ReduxSetupControls).length).toEqual(1);


  });
});


// this should probably be a test on the scoreboard component
// but it was a nice way to familiarize myself with Enzyme mounting
// it('renders correct team name on scoreboard', () => {
//   const wrapper = mount(
//   <App/>
//   );
//   wrapper.setState({
// 			statPlays: [],
// 			gamePoint: 15,
// 			pointValues: {'two': 1, 'three': 2},
// 			teamNames: ['Jimbo', 'Jambo'],
// 			endGameAcknowledged: false,  // for showing/hiding modal,
//   // maybe also for disabling stat buttons?
//   // think about this. how should the app act after game point reached?
// 			activeTab: 'score',
// 		});

//   let scoreDisplay = wrapper.find('.score-display h2');
//   let scoreboardTeam1 = scoreDisplay.at(0).text();
//   let scoreboardTeam2 = scoreDisplay.at(1).text();
//   expect(scoreboardTeam1).toEqual('Jimbo');
//   expect(scoreboardTeam2).toEqual('Jambo');
// });

