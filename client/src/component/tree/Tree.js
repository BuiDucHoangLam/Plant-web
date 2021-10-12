import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { getListFamilia } from '../../api/familia';
import { getListOrdo } from '../../api/ordo';
import { getListGenus } from '../../api/genus';
import { getSpecies } from '../../api/specie';

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

  loadPlantsQuery = () => {    
    getListOrdo().then(resO => {
        getListFamilia().then(resF => {
            getListGenus().then(resG => {
                getSpecies().then(resS => {
                  const results = [...resO.data.map(item => ({...item,style:'ordo'})),
                  ...resF.data.map(item => ({...item,style:'familia'})),
                  ...resG.data.map(item => ({...item,style:'genus'})),
                  ...resS.data.map(item => ({...item,style:'specie'}))
                  ]
                  this.setState({results})
                })
            })
        })
    })
  }

  componentDidMount() {
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

  componentWillUnmount() {
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
                      style:'root',
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

  renderData = () => {
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

    const genusList = this.genusLoop(rsArray)
    const familiaList = this.familiaLoop(rsArray)
    const specieList = this.specieLoop(rsArray)
    const ordoList = this.ordoLoop(rsArray)

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

    arr = [...ordoList,...familiaList,...genusList,...specieList]
    
    const a = this.convertArrayToObject(arr,'path')
    console.log('results',results,'rsArr',rsArray,'a',a);
    console.log('ordo',ordoList,'genus',genusList,'familia',familiaList,'specie',specieList);
    console.log(this.state);
    // this.setState({nodes:a})
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