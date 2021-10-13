import React, { useState } from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import last from 'lodash/last';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createOrdo,deleteOrdo } from '../../api/ordo';
import { createFamilia,deleteFamilia } from '../../api/familia';
import { createGenus,deleteGenus } from '../../api/genus';
import { createSpecie,removeSpecie } from '../../api/specie';
import { DeleteOutlined,EditOutlined,FileAddOutlined,FolderAddOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const [loading,setLoading] = useState(false)
  const [value,setValue] = useState({name:''})
  const { node, getChildNodes, level, onToggle, onNodeSelect } = props;
  const {user} = useSelector(state => ({...state}))
  const {t} = useTranslation()

  const handleRemoveOrdo = async (slug) => {
    if(window.confirm(`${t('reallyDeleteOrdo')} ${slug}?`)) {
      setLoading(true)
      deleteOrdo(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`${t('successDeleteOrdo')} '${res.data.name}'`)
       
      }).catch(err => {
        console.log('Delete ordo',err);
        toast.error(`${t('failDeleteOrdo')} '${err}'`)
      })
    }
  }

  const handleRemoveFamilia = async (slug) => {
    if(window.confirm(`${t('reallyDeleteFamilia')} ${slug}?`)) {
      setLoading(true)
      deleteFamilia(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`${t('successDeleteFamilia')} '${res.data.name}'`)
        
      }).catch(err => {
        console.log('Delete ordo',err);
        toast.error(`${t('failDeleteFamilia')} '${err}'`)
      })
    }
  }

  const handleRemoveSpecie = (slug) => {
    if(window.confirm(`${t('reallyDeleteSpecie')} ${slug}?`)){
      removeSpecie(user.token,slug).then(res => {
        console.log(res.data);
        
        toast.info(`${t('successDeleteSpecie')} ${res.data.name}`)
      }).catch(err => {
        console.log('xóa loài',err);
        toast.error(`${'failDeleteSpecie'}`)
      })
    }
  }

  const handleRemoveGenus = async (slug) => {
    if(window.confirm(`${t('reallyDeleteGenus')} ${slug}?`)) {
      setLoading(true)
      deleteGenus(user.token,slug).then(res => {
        console.log(res);
        setLoading(false)
        toast.info(`${t('successDeleteGenus')} '${res.data.name}'`)
       
      }).catch(err => {
        console.log('Delete genus',err);
        toast.error(`${t('failDeleteGenus')} '${err}'`)
      })
    }
  }

  const handleAdd = (node) => {
    const divBar = document.querySelector(`.div-${node.style}-${node.name}`)
    const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
    const addBar = document.querySelector(`.btn-${node.style}-${node.name}`)
    console.log('input',inputBar.value);
    if(divBar.style.display === 'none') {
      divBar.style.display = 'flex'
    } else {
      divBar.style.display = 'none'
    }
  }

  const handleSubmit = (node) => {
    const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
    
    const save = document.querySelector(`.submit-${node.style}-${node.name}`)
    if(node.style === 'ordo') {
      const obj = {name:inputBar.value,ordo:node._id}
      console.log(obj);
      createFamilia(user.token,obj).then(res => {
        console.log('familia',res.data);
      }).catch(err => console.log(err))
    } else if(node.style === 'root'){
      const obj = {name:inputBar.value}
      console.log(obj);
      createOrdo(user.token,obj).then(res => {
        console.log('ordo',res.data);
      }).catch(err => console.log(err))
    } else if(node.style === 'familia') {
      const obj = {name:inputBar.value,ordo:node.ordo,familia:node._id}
      console.log(obj);
      createGenus(user.token,obj).then(res => {
        console.log('genus',res.data);
      }).catch(err => console.log(err))
    } else if(node.style === 'genus') {
      const obj = {name:inputBar.value,ordo:node.ordo,familia:node.familia,genus:node._id}
      console.log(obj);
      createSpecie(user.token,obj).then(res => {
        console.log('ordo',res.data);
      }).catch(err => console.log(err))
    }
    console.log(save);
  }

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