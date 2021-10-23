import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import { Link } from 'react-router-dom';

const StyledFileExplorer = styled.div`

  max-width: 100%;
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 700px;
`;

export default class FileExplorer extends Component { 
  state = {
    selectedFile: null,
  };

  onSelect = (file) => {
    this.setState({ selectedFile: file });
 
    
  }

  render() {
    const { selectedFile } = this.state;

    return (
      <StyledFileExplorer>
        <TreeWrapper>
          <Tree onSelect={this.onSelect} />
        </TreeWrapper>
      
      </StyledFileExplorer>
    )
  }
}