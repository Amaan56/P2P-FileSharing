import React, { Component } from 'react';
import { Card, Button } from '@material-ui/core';
import * as actions from './actions';
import { connect } from 'react-redux';

class FileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {files: []}
    }
    componentDidMount() {
        
    }
    onUploadCLicked() {
        this.deleteFile(this.props.file);
    }
    renderFiles() {
        let files = []
        if(_.isEmpty(this.state.files)) return <div></div>;
        else {
          _.map(this.state.files, (value, key) => {
            files.push(
                
            );
          });
          return files;
        }
      }
    render() {
        return(
            <div>{this.renderFiles()}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        files: state.file.files
    };
};

export default connect(mapStateToProps, actions)(FileCard);
