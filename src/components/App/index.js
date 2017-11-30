import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workarea from '../Workarea/';
import Artboard from '../Artboard/';
import cssTools from '../../factories/Css';
import Toolbar from '../Toolbar/';
import store from '../../store';

import CodeMirror from 'react-codemirror';

import './styles.css';

import "../../../node_modules/codemirror/lib/codemirror.css";

class App extends Component {
    renderArtboards(){
        const artboards = [this.props.tree];
        return artboards.map((tree, i) => {
            return (<Artboard key={i} tree={tree}></Artboard>);
        });
    }
    updateTree(val){
        store.dispatch({
            type:'TREE_FULL',
            val:JSON.parse(val)
        });
    }
    componentWillMount(){
        // initialize stuff
    }
    componentDidMount(){
        // initialize stuff that requires dom
        let classes = this.props.library.classes;
        let styleSheet = cssTools.getStylesheet('dynamicStylesheet');
        if (styleSheet) {
            cssTools.initializeSheet(styleSheet,classes);
        }
    }

    render() {
        let codeMirrorOptions = {
            mode:'javascript',
            indentWithTabs:true,
            lineNumbers:true
        };
        return (
            <div className="wrap">
                <style id="dynamicStylesheet" type="text/css"></style>
                <div className="menubar">File</div>
                <div className="main">
                    <Toolbar></Toolbar>
                    <Workarea>{this.renderArtboards()}</Workarea>
                    <div className="sidebar">
                        <CodeMirror value={JSON.stringify(this.props.tree, null, 2)} onChange={this.updateTree} options={codeMirrorOptions} />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = function(store) {
  return {
    tree:store.tree,
    library:store.library
  };
};
const SmartApp = connect(mapStateToProps)(App);

export default SmartApp;