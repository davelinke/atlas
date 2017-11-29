import React, { Component } from 'react';

import './Element.css';

class Element extends Component {
    renderChildren(){
        return this.props.specs.children.map(
            (child, i) => {
                return (<Element key={i} specs={child} pick={this.props.pick} />);
            }
        )
    }
    getClassString(){
        let classes = this.props.specs.states[this.props.specs.currentState].classes;
        let classArray = [].concat(classes);
        if(this.props.pick.elements.indexOf(this.props.specs.id)>-1) {
            classArray.push('selected');
        }
        return classArray.join(' ');
    }
    render(){
        let specs =  this.props.specs.states[this.props.specs.currentState];
        return (<div data-element-id={this.props.specs.id} className={this.getClassString()} style={specs.style}>{specs.text}{this.renderChildren()}</div>);
    }
}

export default Element;
