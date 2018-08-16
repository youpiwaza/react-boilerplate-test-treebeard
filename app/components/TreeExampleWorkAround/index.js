/**
 * TreeExample
 *
 * @author       youpiwaza
 * @description  TreeBeard example componant
 * @see          doc      / https://github.com/storybooks/react-treebeard
 * @see          issue    / https://github.com/storybooks/react-treebeard/issues/100
 * @see          sandbox  / https://codesandbox.io/s/Q5AE9vG0?module=OygDp
 * @version      4
 *
 * Note : plugin is broken AF as it mutates data (even if cloned with Object.assign)
 * A seemingly working workaround is to do multiples imports..
 * @see https://github.com/storybooks/react-treebeard/issues/138
 * @see https://github.com/storybooks/react-treebeard/issues/119
 *
 * Workaround by using multiple imports ; caution, not DRY on datas...
 */

import PropTypes from 'prop-types';

import React from 'react';
// import ReactDOM from 'react-dom';
import { decorators, Treebeard } from 'react-treebeard';
import defaultTheme from 'react-treebeard/lib/themes/default';

import data1 from './data.json';
import data2 from './data2.json';
import data3 from './data3.json';

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

class TreeExampleWorkAround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tree1: {},
      tree2: {},
      tree3: {},
    };
    // Mandatory to give access to TreeExampleWorkAround this.state
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
    };
  }

  render() {
    return (
      <div>
        <h2>Tree without decorators</h2>
        <Treebeard data={data1} onToggle={this.handleToggleHOF('tree1')} />

        <h2>Tree with decorator 1</h2>
        <Treebeard
          data={data2}
          decorators={modifiedDecorators}
          onToggle={this.handleToggleHOF('tree2')}
        />

        <h2>Tree with decorator 2</h2>
        <Treebeard
          data={data3}
          decorators={modifiedDecorators2}
          onToggle={this.handleToggleHOF('tree3')}
          style={customTheme}
        />
      </div>
    );
  }
}

export default TreeExampleWorkAround;
