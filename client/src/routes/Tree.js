import React, {  useState } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

const data = {
  '/root': {
    path: '/root',
    type: 'folder',
    isRoot: true,
    children: ['/root/david', '/root/jslancer'],
  },
  '/root/david': {
    path: '/root/david',
    type: 'folder',
    children: ['/root/david/readme.md'],
  },
  '/root/david/readme.md': {
    path: '/root/david/readme.md',
    type: 'file',
    content: 'Thanks for reading me me. But there is nothing here.'
  },
  '/root/jslancer': {
    path: '/root/jslancer',
    type: 'folder',
    children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
  },
  '/root/jslancer/projects': {
    path: '/root/jslancer/projects',
    type: 'folder',
    children: ['/root/jslancer/projects/treeview'],
  },
  '/root/jslancer/projects/treeview': {
    path: '/root/jslancer/projects/treeview',
    type: 'folder',
    children: [],
  },
  '/root/jslancer/vblogs': {
    path: '/root/jslancer/vblogs',
    type: 'folder',
    children: [],
  },
};

const Tree = (props) => {
  const [nodes,setNodes] = useState(data)

  const getRootNodes = () => {
    const n = nodes
    return values(n).filter(node => node.isRoot === true);
  }

  const getChildNodes = (node) => {
    const n = nodes
    if (!node.children) return [];
    return node.children.map(path => n[path]);
  }  

  const onToggle = (node) => {
    const n = nodes
    n[node.path].isOpen = !node.isOpen;
    setNodes(n);
    console.log(n);
  }

  const onNodeSelect = node => {
    const {onSelect} = props
    onSelect(node);
    console.log(onSelect);
  }

  return (
    
    <div style ={{marginTop:'200px',height:'500px'}}>
      {getRootNodes.map(node => (
        <TreeNode 
          key = {node.path}
          node={node}
          getChildNodes={getChildNodes}
          onToggle={onToggle}
          onNodeSelect={onNodeSelect}
        />
      ))}
    </div>
  )
  
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Tree