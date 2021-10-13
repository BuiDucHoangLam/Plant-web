import React, { useState } from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DeleteOutlined,EditOutlined,FileAddOutlined,FolderAddOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';


const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
}

const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level, props.type)}px;

  &:hover {
    background: lightgray;
  }
`;

const NodeIcon = styled.div`
  font-size: 12px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const getNodeLabel = (node) => node.name;

const TreeNode = (props) => {

  const { node, getChildNodes, 
    level, onToggle, 
    onNodeSelect, 
    handleRemoveOrdo,handleRemoveFamilia,
    handleRemoveSpecie,
    handleRemoveGenus,
    handleAdd,
    handleSubmit
  
  } = props;


  

  return (
    <React.Fragment>
      <StyledTreeNode level={level} type={node.type}>
        <NodeIcon onClick={() => onToggle(node)}>
          { node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />) }
        </NodeIcon>
        
        <NodeIcon marginRight={10}>
          { node.type === 'file' && <FaFile /> }
          { node.type === 'folder' && node.isOpen === true && <FaFolderOpen /> }
          { node.type === 'folder' && !node.isOpen && <FaFolder /> }  
        </NodeIcon>
        

        <span role="button" onClick={() => onNodeSelect(node)}>
         {!node.isRoot &&  <Link to={node.style === 'specie' ? `/details-specie/${node.slug}` :  `/details-${node.style}/${node.slug}`}> { getNodeLabel(node) } </Link>}
        </span>
        {
          node.type !== 'file' &&
          <div className ={`div-${node.style}-${node.name}`} style ={{width:'100%',display:'flex',display:'none'}}>
            <input
            
            style = {{marginBottom:'0',marginLeft:'auto',width:'50%'}}
            name = 'insert'
            className = {`form-control insert-value-${node.style}-${node.name}`}
            type = 'text'
            placeholder = 'insert name'
            
          />
          <button
            onClick = {() => handleSubmit(node)}
            className = {`submit-${node.style}-${node.name}`}
          >
            Save
          </button>
          </div>
        }
        {node.type !== 'file' &&
          <span
            onClick = {() => handleAdd(node)}
            // style={{marginLeft:'auto',display:'flex',alignItems:"center"}} 
            className={`btn btn-sm float-right btn-${node.style}-${node.name}`}
       
          >
           
          <FolderAddOutlined 
            className ='text-primary' 
          />
          
        </span> 
        }
        {!node.isRoot
        && <Link
           
            to = {`/admin/${node.style}/${node.slug}`}
          >
          <span
            
              className="btn btn-sm float-right"
              style ={{marginLeft:'auto',paddingTop:'0'}}
            >
            <EditOutlined 
            
              className ='text-warning' 
            />
           
          </span> 
        </Link> 
        }
        {!node.isRoot 
        && <span
            // onClick ={node.style === 'ordo' ? ()=>handleRemoveOrdo(node.slug) : node.style === 'familia' ? () => handleRemoveFamilia(node.slug) ? node.style === 'genus' ? () => handleRemoveGenus(node.slug) : () => handleRemoveSpecie(node.slug)} 
          style ={{paddingTop:'0'}}
            
            className="btn btn-sm float-right"
            onClick = {node.style === 'ordo' ? ()=>handleRemoveOrdo(node.slug) : (node.style === 'familia') ? ()=> handleRemoveFamilia(node.slug) : (node.style === 'genus') ? () => handleRemoveGenus(node.slug) : () => handleRemoveSpecie(node.slug)}
          >
          <DeleteOutlined 
            className ='text-danger' 
          />
        </span>
        }
      </StyledTreeNode>

      { node.isOpen && getChildNodes(node).map(childNode => (
        <TreeNode 
          {...props}
          key = {childNode.path}

          node={childNode}          
          level={level + 1}
        />
      ))}
    </React.Fragment>
  );
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
};

TreeNode.defaultProps = {
  level: 0,
};

export default TreeNode;