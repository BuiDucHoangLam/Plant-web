import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { getListFamilia,createFamilia,deleteFamilia } from '../../api/familia';
import { getListOrdo,createOrdo,deleteOrdo } from '../../api/ordo';
import { getListGenus,createGenus,deleteGenus } from '../../api/genus';
import { getSpecies,createSpecie,removeSpecie } from '../../api/specie';
import { DeleteOutlined,EditOutlined,FileAddOutlined,FolderAddOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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

export default class Tree extends Component {
  state = {
    nodes: data,
    results:[],
    obj:{},
  };

  // handleRemoveOrdo = async (slug) => {
  //   if(window.confirm(`${t('reallyDeleteOrdo')} ${slug}?`)) {
  //     setLoading(true)
  //     deleteOrdo(user.token,slug).then(res => {
  //       console.log(res);
  //       setLoading(false)
  //       toast.info(`${t('successDeleteOrdo')} '${res.data.name}'`)
       
  //     }).catch(err => {
  //       console.log('Delete ordo',err);
  //       toast.error(`${t('failDeleteOrdo')} '${err}'`)
  //     })
  //   }
  // }

  // handleRemoveFamilia = async (slug) => {
  //   if(window.confirm(`${t('reallyDeleteFamilia')} ${slug}?`)) {
  //     setLoading(true)
  //     deleteFamilia(user.token,slug).then(res => {
  //       console.log(res);
  //       setLoading(false)
  //       toast.info(`${t('successDeleteFamilia')} '${res.data.name}'`)
        
  //     }).catch(err => {
  //       console.log('Delete ordo',err);
  //       toast.error(`${t('failDeleteFamilia')} '${err}'`)
  //     })
  //   }
  // }

  // handleRemoveSpecie = (slug) => {
  //   if(window.confirm(`${t('reallyDeleteSpecie')} ${slug}?`)){
  //     removeSpecie(user.token,slug).then(res => {
  //       console.log(res.data);
        
  //       toast.info(`${t('successDeleteSpecie')} ${res.data.name}`)
  //     }).catch(err => {
  //       console.log('xóa loài',err);
  //       toast.error(`${'failDeleteSpecie'}`)
  //     })
  //   }
  // }

  // handleRemoveGenus = async (slug) => {
  //   if(window.confirm(`${t('reallyDeleteGenus')} ${slug}?`)) {
  //     setLoading(true)
  //     deleteGenus(user.token,slug).then(res => {
  //       console.log(res);
  //       setLoading(false)
  //       toast.info(`${t('successDeleteGenus')} '${res.data.name}'`)
       
  //     }).catch(err => {
  //       console.log('Delete genus',err);
  //       toast.error(`${t('failDeleteGenus')} '${err}'`)
  //     })
  //   }
  // }

  // handleAdd = (node) => {
  //   const divBar = document.querySelector(`.div-${node.style}-${node.name}`)
  //   const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
  //   const addBar = document.querySelector(`.btn-${node.style}-${node.name}`)
  //   console.log('input',inputBar.value);
  //   if(divBar.style.display === 'none') {
  //     divBar.style.display = 'flex'
  //   } else {
  //     divBar.style.display = 'none'
  //   }
  // }

  // handleSubmit = (node) => {
  //   const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
    
  //   const save = document.querySelector(`.submit-${node.style}-${node.name}`)
  //   if(node.style === 'ordo') {
  //     const obj = {name:inputBar.value,ordo:node._id}
  //     console.log(obj);
  //     createFamilia(user.token,obj).then(res => {
  //       console.log('familia',res.data);
  //     }).catch(err => console.log(err))
  //   } else if(node.style === 'root'){
  //     const obj = {name:inputBar.value}
  //     console.log(obj);
  //     createOrdo(user.token,obj).then(res => {
  //       console.log('ordo',res.data);
  //     }).catch(err => console.log(err))
  //   } else if(node.style === 'familia') {
  //     const obj = {name:inputBar.value,ordo:node.ordo,familia:node._id}
  //     console.log(obj);
  //     createGenus(user.token,obj).then(res => {
  //       console.log('genus',res.data);
  //     }).catch(err => console.log(err))
  //   } else if(node.style === 'genus') {
  //     const obj = {name:inputBar.value,ordo:node.ordo,familia:node.familia,genus:node._id}
  //     console.log(obj);
  //     createSpecie(user.token,obj).then(res => {
  //       console.log('ordo',res.data);
  //     }).catch(err => console.log(err))
  //   }
  //   console.log(save);
  // }

  renderData = () => {
    getListOrdo().then(resO => {
      getListFamilia().then(resF => {
          getListGenus().then(resG => {
              getSpecies().then(resS => {
                  this.setState({results:[...resO.data.map(item => ({...item,style:'ordo'})),
                  ...resF.data.map(item => ({...item,style:'familia'})),
                  ...resG.data.map(item => ({...item,style:'genus'})),
                  ...resS.data.map(item => ({...item,style:'specie'}))
                  ]})

                  let rsArray = []
                  let arr = []
                  const {results,obj} = this.state
                  results.map(item => {
                    if(item.style === 'specie'){
                      item.path = `/root/${item.ordo?._id}/${item.familia?._id}/${item.genus?._id}/${item?._id}`
                      item.type = 'file'
                      item.loop = item.path.split('/')
                      rsArray.push(item)
                    }
                    else if(item.style === 'genus'){
                      item.path = `/root/${item.ordo}/${item.familia}/${item._id}`
                      item.type = 'folder'
                      item.loop = item.path.split('/')
                      rsArray.push(item)
                    }
                    else if(item.style === 'familia'){
                      item.path = `/root/${item.ordo}/${item._id}`
                      item.type = 'folder'
                      item.loop = item.path.split('/')
                      rsArray.push(item)
                    }
                    else {
                      item.path = `/root/${item._id}`
                      item.type = 'folder'
                      item.loop = item.path.split('/')
                      rsArray.push(item)
                    }
                  })

                  // rsArray = results
                  const genusList = this.genusLoop(rsArray)
                  const familiaList = this.familiaLoop(rsArray)
                  const specieList = this.specieLoop(rsArray)
                  const ordoList = this.ordoLoop(rsArray)
                  const root = [{
                    name:'plant',
                    path: '/root',
                    type: 'folder',
                    isRoot: true,
                    children: []
                  }]

                  ordoList.map(ordo => {
                    root[0].children.push(ordo.path)
                  })  

                  ordoList.map(ordo => {
                    let arr = []
                    familiaList.map(familia => {
                      if(ordo.loop[2] === familia.loop[2]) {
                        arr.push(familia.path)
                        ordo.children = arr
                      }
                    })
                  })

                  familiaList.map(familia => {
                    let arr = []
                    genusList.map(genus => {
                      if(familia.loop[3] === genus.loop[3]) {
                        arr.push(genus.path)
                        familia.children = arr
                      }
                    })
                  })

                  genusList.map(genus => {
                    let arr = []
                    specieList.map(specie => {
                      if(genus.loop[4] === specie.loop[4]) {
                        arr.push(specie.path)
                        genus.children = arr
                      }
                    })
                  })

                  arr = [...ordoList,...familiaList,...genusList,...specieList,...root]
                  
                  const nodes = this.convertArrayToObject(arr,'path')
                  console.log('results',results,'rsArr',rsArray,'a',nodes);
                  console.log('ordo',ordoList,'genus',genusList,'familia',familiaList,'specie',specieList);
                  console.log(this.state);
                  this.setState({nodes}) 
                })
            })
        })
    })
  }

  componentDidMount() {
    this.renderData()
    
  }

  convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
    
  

  getRootNodes = () => {
    // const nodes = this.renderData()
    const { nodes } = this.state;
   
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node) => {
    const { nodes } = this.state;
    // const nodes = this.renderData()
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }  

  onToggle = (node) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

 ordoLoop = arr => {
    let a = []
    arr.map(item => {
      if(item.style === 'ordo')
      a.push(item)
    })
    return a
  }

  genusLoop = arr => {
    let a = []
    arr.map(item => {
      if(item.style === 'genus')
      a.push(item)
    })
    return a
  }

  familiaLoop = arr => {
    let a = []
    arr.map(item => {
      if(item.style === 'familia')
      a.push(item)
    })
    return a
  }

  specieLoop = arr => {
    let a = []
    arr.map(item => {
      if(item.style === 'specie')
      a.push(item)
    })
    return a
  }

  render() {
    
    const rootNodes = this.getRootNodes();
   
     return (
      
      <div style ={{marginTop:'200px',height:'100%'}}>
       
        
        {rootNodes.map(node => (
          <TreeNode 
            key = {node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};