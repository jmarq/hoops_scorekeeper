import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import App from './App';
import {UnwrappedApp} from './App';
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


describe('test basic rendering using mock store', () => {
  const mockStore = configureMockStore();


  it('renders without crashing', () => {
    let initialState = {
      settings: defaultSettings,
      plays: [],
      endGameAcknowledged: false,
      activeTab: 'Plays',
    };
    let store = mockStore(initialState);
    let wrapper = mount(<Provider store={store}><App/></Provider>);
    // console.log(wrapper.find(PlayByPlay).prop("plays"));
  });
});

describe('test rendering with "real" store', () => {
  it('renders correct tabs', () => {
    let initialState = {
      settings: defaultSettings,
      plays: [],
      endGameAcknowledged: false,
      activeTab: 'Setup',
    };

    let store = configureStore(initialState);
    let wrapper = mount(<Provider store={store}><App/></Provider>);

    // plays, stats, score, setup
    store.dispatch(changeTab('Plays'));
    expect(wrapper.find(PlayByPlay).length).toEqual(1);

    store.dispatch(changeTab('Stats'));
    expect(wrapper.find(TeamStats).length).toEqual(2);

    store.dispatch(changeTab('Score'));
    expect(wrapper.find(ScoreControls).length).toEqual(2);
    expect(wrapper.find(Scoreboard).length).toEqual(1);

    store.dispatch(changeTab('Setup'));
    expect(wrapper.find(ReduxSetupControls).length).toEqual(1);
  });
});


describe('helper methods', () => {
  let testProps = {
      settings: defaultSettings,
      statPlays: [],
      endGameAcknowledged: false,
      activeTab: 'Score',
      actions: {
        addPlay: (playObject) => {
        },
        undoPlay: () => {
        },
        resetGame: () => {
        },
        updateSettings: (settingsObject) => {
        },
        resetSettings: () => {
        },
        acknowledgeEndGame: () => {
        },
        changeTab: (tabName) => {
        },
      },
    };


  it('knows if a rebound is needed', () => {
    let props = {
      ...testProps,
    };
    let app = shallow(<UnwrappedApp {...props} />);
    // no plays yet, needRebound should be false
    expect(app.instance().needRebound()).toEqual([false, undefined]);
    // with miss as latest play, needRebound should be true
    app.setProps({
      statPlays: [{
        playType: 'miss', team: 0,
      }],
    });
    expect(app.instance().needRebound()).toEqual([true, 0]);
  });


  it('keeps score correctly', () => {
    let props = {
      ...testProps,
    };
    let app = shallow(<UnwrappedApp {...props} />);
    // no plays yet, score should be 0
    let instance = app.instance();

    expect(instance.teamScore(0)).toEqual({
      index: 0,
      name: props.settings.teamNames[0],
      score: 0,
    });

    app.setProps({
      statPlays: [
        {playType: 'score', team: 0, points: 'two'},
        {playType: 'score', team: 0, points: 'three'},
        {playType: 'score', team: 1, points: 'two'},
      ],
    });
    let currentProps = instance.props;
    let currentPointValues = currentProps.settings.pointValues;
    let expectedTotal = currentPointValues.two + currentPointValues.three;
    expect(instance.teamScore(0).score).toEqual(expectedTotal);

    // does it still work after changing the pointValues settings?
    app.setProps({
      settings: {
        ...testProps.settings,
        pointValues: {
          two: 200,
          three: 300,
        },
      },
    });

    currentProps = instance.props;
    currentPointValues = currentProps.settings.pointValues;
    expectedTotal = currentPointValues.two + currentPointValues.three;
    expect(instance.teamScore(0).score).toEqual(expectedTotal);
  });


  it('knows when a team has won', () => {
    let props = {
      ...testProps,
      settings: {
        ...testProps.settings,
        winByTwo: true,
        gamePoint: 15,
        pointValues: {
          two: 14,
          three: 15,
        },
      },
    };
    let app = shallow(<UnwrappedApp {...props} />);
    // no plays yet, should have no winner
    let instance = app.instance();
    expect(instance.winningTeam()).toEqual(false);
    let team0 = instance.props.settings.teamNames[0];

    app.setProps({
      statPlays: [
        {team: 0, playType: 'score', points: 'three'},
      ],
    });
    // 15-0, winner should be team 0
    expect(instance.winningTeam()).toEqual(team0);

    app.setProps({
      statPlays: [
        {team: 0, playType: 'score', points: 'three'},
        {team: 1, playType: 'score', points: 'two'},
      ],
    });
    // 15-14, one point margin, no winner
    expect(instance.winningTeam()).toEqual(false);

    app.setProps({
      settings: {
        ...instance.props.settings,
        winByTwo: false,
      },
    });
    // 15-14, winByTwo is false, team0 should win
    expect(instance.winningTeam()).toEqual(team0);
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

