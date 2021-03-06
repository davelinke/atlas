import React, { Component } from 'react';

import './styles.css';

class ToolbarButton extends Component {
    constructor(props){
        super(props);
        this.toolName = this.props.toolName;
        this.tool = this.props.tool;
        this.toolIcon = this.tool.iconClass;
        this.iconString = this.tool.iconString;
        this.renderIcon = function(){
            if (this.toolIcon) return <span className={this.toolIcon}>{this.iconString}</span>;
        };
        this.activateTool = function(){
            this.props.activateTool(this.toolName);
        }.bind(this);
        this.theClass = function(){
            return 'toolbar__button'+(this.props.toolName===this.props.currentTool?' active':'')
        }.bind(this);
    }
    render(){
        return (<button className={this.theClass()} onClick={this.activateTool}>{this.renderIcon()}<span className="sr-only">{this.toolName}</span></button>);
    }
}

export default ToolbarButton;
