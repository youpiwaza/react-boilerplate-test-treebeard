/**
 * TreeExample
 *
 * @author       youpiwaza
 * @description  TreeBeard example componant
 * @see          doc      / https://github.com/storybooks/react-treebeard
 * @see          issue    / https://github.com/storybooks/react-treebeard/issues/100
 * @see          sandbox  / https://codesandbox.io/s/Q5AE9vG0?module=OygDp
 * @version      3
 *
 * Note : plugin is broken AF as it mutates data (even if cloned with Object.assign)
 * A seemingly working workaround is to do multiples imports..
 * @see https://github.com/storybooks/react-treebeard/issues/138
 * @see https://github.com/storybooks/react-treebeard/issues/119
 */

import PropTypes from 'prop-types';

import React from 'react';
// import ReactDOM from 'react-dom';
import { decorators, Treebeard } from 'react-treebeard';
import defaultTheme from 'react-treebeard/lib/themes/default';

import data from './data.json';

const data1 = Object.assign({}, data);
const data2 = Object.assign({}, data);
const data3 = Object.assign({}, data);

data1.name = 'anotherName';
console.log('data1.name', data1.name);
console.log('data.name', data.name);
console.log("Orginal data name isn't changed by Object.assign()");

// Extract custom header to allow props validation
const customHeader = props => (
  <span style={props.style}>{props.node.name} lol</span>
);
customHeader.propTypes = {
  node: PropTypes.any,
  style: PropTypes.any,
};

// Create a separate instance of decorators
// Use plugin base & update only what's necessary
const modifiedDecorators = Object.assign({}, decorators, {
  Header: customHeader,
});

// Another decorator
// Treeview basic theme overload
// Probably a better way to write this =3
const customTheme = Object.assign({}, defaultTheme, {
  ...defaultTheme,
  tree: {
    ...defaultTheme.tree,
    base: {
      ...defaultTheme.tree.base,
      color: 'red',
    },
  },
});
const customHeader2 = props => (
  <span style={props.style}>{props.node.name} wesh</span>
);
customHeader2.propTypes = {
  node: PropTypes.any,
  style: PropTypes.any,
};

const modifiedDecorators2 = Object.assign({}, decorators, {
  Header: customHeader2,
});

class TreeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree1: {},
      tree2: {},
      tree3: {},
    };
    // Mandatory to give access to TreeExample this.state
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleHOF = this.handleToggleHOF.bind(this);
  }

  // HOF to prevent manipulating all Treebeard instances when clicking on one instance
  // params : Clicked/toggled node and his toggled state
  handleToggleHOF(treeName) {
    return (node, toggled) => {
      // Apply issues recommandations
      // @see https://github.com/storybooks/react-treebeard/issues/119
      const cursor = { ...this.state[treeName].cursor };

      // Remove active state on precedent cursor
      if (cursor) {
        cursor.active = false;
      }

      // linter > Avoid params reassign...
      const datNode = node;

      // Clicked node becomes active
      datNode.active = true;

      // If node have children, toggle it
      // Not sure how the toggle effect if made tho
      if (datNode.children) {
        datNode.toggled = toggled;
      }

      // Update state
      // this.setState({ cursor: datNode });

      // update with dynamic props
      const newstate = Object.assign({}, this.state);
      newstate[treeName] = { ...newstate[treeName], cursor: datNode };
      console.log(`handleToggleHOF(${treeName}) > new state`, newstate);
      this.setState(newstate);

      console.log('handleToggle() > data', data);
      console.log('Original data has changed');
    };
  }

  // Test with a dedicated handleToggle function, in case the problem came from HOF..
  // params : Clicked/toggled node and his toggled state
  handleToggle(node, toggled) {
    // Remove active state on precedent cursor
    const cursor = { ...this.state.cursor };
    if (cursor) {
      cursor.active = false;
    }

    // linter > Avoid params reassign...
    const datNode = node;

    // Clicked node becomes active
    datNode.active = true;

    // If node have children, toggle it
    // Not sure how the toggle effect if made tho
    if (datNode.children) {
      datNode.toggled = toggled;
    }

    // Update state
    this.setState({ cursor: datNode });

    // console.log(this.state);
    console.log('handleToggle() > data', data);
    console.log('handleToggle() > data3', data3);
    console.log('Original data has changed');
  }

  render() {
    return (
      <div>
        <h1>Tree without decorators</h1>
        <Treebeard data={data1} onToggle={this.handleToggleHOF('tree1')} />

        <h1>Tree with decorator 1</h1>
        <Treebeard
          data={data2}
          decorators={modifiedDecorators}
          onToggle={this.handleToggleHOF('tree2')}
        />

        <h1>Tree with decorator 2</h1>
        <Treebeard
          data={data3}
          decorators={modifiedDecorators2}
          onToggle={this.handleToggle}
          style={customTheme}
        />
      </div>
    );
  }
}

export default TreeExample;
