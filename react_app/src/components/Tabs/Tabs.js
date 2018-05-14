import React, { Component } from 'react';
import "./Tabs.css";
class Tabs extends Component {

  tabClass = (name) => {
    return ''+ (this.props.activeTab === name ? ' is-active' : '');
  }
  // what about making this component able to take a list of tab labels/classes and dynamically generating the ul>li>a markup?
  //   aka making this thing re-usable
  // uses bulma css framework built-in classes for tabs
  render() {
    return(
      <div className="tabs is-large">
        <ul>
          <li className={this.tabClass('score')} >
            <a data-tab="score" onClick={this.props.handler}>Score</a>
          </li>
          <li className={this.tabClass('stats')}>
            <a data-tab="stats" onClick={this.props.handler}>Stats</a>
          </li>
          <li className={this.tabClass('plays')}>
            <a data-tab="plays" onClick={this.props.handler}>Plays</a>
          </li>
          <li className={this.tabClass('setup')}>
            <a data-tab="setup" onClick={this.props.handler}>Setup</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Tabs;
