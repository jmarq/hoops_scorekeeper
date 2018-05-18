import React, { Component } from 'react';
import "./Tabs.css";
class Tabs extends Component {

  tabClass = (name) => {
    return ''+ (this.props.activeTab === name ? ' is-active' : '');
  }

  clickHandler = (ev) => {
    // call the handler provided via props
    //   pass in the data-tab value of clicked tab link
    this.props.handler(ev.target.getAttribute('data-tab'));
  }
  // what about making this component able to take a list of tab labels/classes and dynamically generating the ul>li>a markup?
  //   aka making this thing re-usable
  // uses bulma css framework built-in classes for tabs
  render() {
    return(
      <div className="tabs is-large">
        <ul>
          {this.props.tabNames.map((name, index) => {
            return(
              <li key={"tab"+index} className={this.tabClass(name)}>
                <a data-tab={name} onClick={this.clickHandler}>{name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Tabs;
