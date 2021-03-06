import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { singleFileRemove } from '../../api/image';
import { getListFamilia, createFamilia, deleteFamilia, getFamilia, getFamiliaListGenus } from '../../api/familia';
import { getListOrdo, createOrdo, deleteOrdo, getOrdo, getOrdoListFamilia } from '../../api/ordo';
import { getListGenus, createGenus, deleteGenus, getGenus, getGenusListSpecies } from '../../api/genus';
import { getSpecies, createSpecie, removeSpecie, getSpecie } from '../../api/specie';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import TreeNode from './TreeNode';
import '../../index.css'
import '../../css/responsive.css'

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

class Tree extends Component {
  state = {
    nodes: data,
    results: [],
    obj: {},
    loading: false
  };

  handleRemoveOrdo = async (slug) => {
    if (window.confirm(`Delete ordo ${slug}?`)) {
      getOrdo(slug).then(res => getOrdoListFamilia(res.data._id).then(rs => {
        console.log('data', rs.data.length, 'type', typeof (rs.data));
        if (rs.data && rs.data.length > 0) {

          toast.error(`Kh??ng th??? x??a do t???n t???i ${rs.data.length} H??? thu???c B??? n??y `)

        } else {
          this.setState({ loading: true })
          getOrdo(slug).then(res => {
            if (res.data.images.length > 0) {
              res.data.images.map(item => singleFileRemove(item.fileName))
            }
          })
          deleteOrdo(this.props.user.token, slug).then(res => {
            console.log(res);
            this.setState({ loading: false })
            this.renderData()
            toast.info(`X??a th??nh c??ng b??? '${res.data.name}'`)

          }).catch(err => {
            console.log('X??a th???t b???i', err);
            toast.error(`Failed '${err}'`)
          })
        }

      }))
      // this.setState({loading:true})
      // deleteOrdo(this.props.user.token,slug).then(res => {
      //   console.log(res);
      //   this.setState({loading:false})
      //   this.renderData()
      //   toast.info(`Success '${res.data.name}'`)

      // }).catch(err => {
      //   console.log('Delete ordo',err);
      //   toast.error(`Failed '${err}'`)
      // })
    }
  }

  handleRemoveFamilia = async (slug) => {
    if (window.confirm(`Delete familia ${slug}?`)) {
      getFamilia(slug).then(res => getFamiliaListGenus(res.data._id).then(rs => {
        if (rs.data && rs.data.length > 0) {
          toast.error(`Kh??ng th??? x??a do t???n t???i ${rs.data.length} Chi thu???c H??? n??y`)

        } else {
          getFamilia(slug).then(res => {
            if (res.data.images.length > 0) {
              res.data.images.map(item => singleFileRemove(item.fileName))
            }
          })
          deleteFamilia(this.props.user.token, slug).then(res => {
            console.log(res);
            this.setState({ loading: false })
            this.renderData()
            toast.info(`X??a th??nh c??ng h??? '${res.data.name}'`)

          }).catch(err => {
            console.log('X??a th???t b???i', err);
            toast.error(`Failed '${err}'`)
          })
        }
      }))
      // this.setState({ loading: true })
      // deleteFamilia(this.props.user.token, slug).then(res => {
      //   console.log(res);
      //   this.setState({ loading: false })
      //   this.renderData()
      //   toast.info(`Success '${res.data.name}'`)

      // }).catch(err => {
      //   console.log('Delete ordo', err);
      //   toast.error(`Failed '${err}'`)
      // })
    }
  }

  handleRemoveSpecie = (slug) => {
    if (window.confirm(`Delete specie ${slug}?`)) {
      getSpecie(slug).then(res => {
        if(res.data.images.imagesBackground.length > 0) {
          res.data.images.imagesBackground.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesClove.length > 0) {
          res.data.images.imagesClove.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesFlower.length > 0) {
          res.data.images.imagesFlower.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesFruit.length > 0) {
          res.data.images.imagesFruit.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesLeave.length > 0) {
          res.data.images.imagesLeave.map(item => singleFileRemove(item.fileName))
        } 
        if(res.data.images.imagesSeed.length > 0) {
          res.data.images.imagesSeed.map(item => singleFileRemove(item.fileName))
        } 
      })
      removeSpecie(this.props.user.token, slug).then(res => {
        console.log(res.data);
        this.renderData()

        toast.info(`X??a th??nh c??ng lo??i ${res.data.name}`)
      }).catch(err => {
        console.log('X??a th???t b???i', err);
        toast.error(`${'failDeleteSpecie'}`)
      })
    }
  }

  handleRemoveGenus = async (slug) => {
    if (window.confirm(`Delete genus ${slug}?`)) {
      this.setState({ loading: true })
      getGenus(slug).then(res => getGenusListSpecies(res.data._id).then(rs => {
        console.log(rs.data);
        if (rs.data && rs.data.length > 0) {
          toast.error(`Kh??ng th??? x??a do t???n t???i ${rs.data.length} Lo??i thu???c Chi n??y`)

        } else {
          this.setState({ loading: true })
          getGenus(slug).then(res => {
            if (res.data.images.length > 0) {
              res.data.images.map(item => singleFileRemove(item.fileName))
            }
          })
          deleteGenus(this.props.user.token, slug).then(res => {
            console.log(res);
            this.renderData()
            this.setState({ loading: false })
            toast.info(`X??a th??nh c??ng chi '${res.data.name}'`)

          }).catch(err => {
            console.log('X??a th???t b???i', err);
            toast.error(`Failed '${err}'`)
          })
        }
      }))
      // deleteGenus(this.props.user.token, slug).then(res => {
      //   console.log(res);
      //   this.renderData()
      //   this.setState({ loading: false })
      //   toast.info(`Success '${res.data.name}'`)

      // }).catch(err => {
      //   console.log('Delete genus', err);
      //   toast.error(`Failed '${err}'`)
      // })
    }
  }

  handleAdd = (node) => {
    const divBar = document.querySelector(`.div-${node.style}-${node.name}`)
    const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
    console.log('input', inputBar.value);
    if (divBar.style.display === 'none') {
      divBar.style.display = 'flex'
    } else {
      divBar.style.display = 'none'
    }
  }

  handleSubmit = (node) => {
    const inputBar = document.querySelector(`.insert-value-${node.style}-${node.name}`)
    const divBar = document.querySelector(`.div-${node.style}-${node.name}`)

    const save = document.querySelector(`.submit-${node.style}-${node.name}`)
    if (node.style === 'ordo') {
      const obj = { name: inputBar.value, ordo: node._id }
      console.log(obj);
      createFamilia(this.props.user.token, obj).then(res => {
        divBar.style.display = 'none'

        this.renderData()
        console.log('familia', res.data);
      }).catch(err => console.log(err))
    } else if (node.style === 'root') {
      const obj = { name: inputBar.value }
      console.log(obj);
      createOrdo(this.props.user.token, obj).then(res => {
        divBar.style.display = 'none'
        this.renderData()
        console.log('ordo', res.data);
      }).catch(err => console.log(err))
    } else if (node.style === 'familia') {
      const obj = { name: inputBar.value, ordo: node.ordo, familia: node._id }
      console.log(obj);
      createGenus(this.props.user.token, obj).then(res => {
        divBar.style.display = 'none'
        this.renderData()
        console.log('genus', res.data);
      }).catch(err => console.log(err))
    } else if (node.style === 'genus') {
      const obj = { name: inputBar.value, ordo: node.ordo, familia: node.familia, genus: node._id }
      console.log(obj);
      createSpecie(this.props.user.token, obj).then(res => {
        divBar.style.display = 'none'
        this.renderData()
        console.log('ordo', res.data);
      }).catch(err => console.log(err))
    }
    console.log(save);
  }

  renderData = () => {
    getListOrdo().then(resO => {
      getListFamilia().then(resF => {
        getListGenus().then(resG => {
          getSpecies().then(resS => {
            this.setState({
              results: [...resO.data.map(item => ({ ...item, style: 'ordo' })),
              ...resF.data.map(item => ({ ...item, style: 'familia' })),
              ...resG.data.map(item => ({ ...item, style: 'genus' })),
              ...resS.data.map(item => ({ ...item, style: 'specie' }))
              ]
            })

            let rsArray = []
            let arr = []
            const { results } = this.state
            results.map(item => {
              if (item.style === 'specie') {
                item.path = `/root/${item.ordo?._id}/${item.familia?._id}/${item.genus?._id}/${item?._id}`
                item.type = 'file'
                item.loop = item.path.split('/')
                rsArray.push(item)
              }
              else if (item.style === 'genus') {
                item.path = `/root/${item.ordo}/${item.familia}/${item._id}`
                item.type = 'folder'
                item.loop = item.path.split('/')
                rsArray.push(item)
              }
              else if (item.style === 'familia') {
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
              return rsArray
            })

            // rsArray = results
            const genusList = this.genusLoop(rsArray)
            const familiaList = this.familiaLoop(rsArray)
            const specieList = this.specieLoop(rsArray)
            const ordoList = this.ordoLoop(rsArray)
            const root = [{
              name: 'Plants',
              path: '/root',
              type: 'folder',
              isRoot: true,
              style: 'root',
              children: []
            }]

            ordoList.map(ordo => {
              return root[0].children.push(ordo.path)
            })

            ordoList.map(ordo => {
              let arr = []
              familiaList.map(familia => {
                if (ordo.loop[2] === familia.loop[2]) {
                  arr.push(familia.path)
                  ordo.children = arr
                }
              })
            })

            familiaList.map(familia => {
              let arr = []
              genusList.map(genus => {
                if (familia.loop[3] === genus.loop[3]) {
                  arr.push(genus.path)
                  familia.children = arr
                }
              })
            })

            genusList.map(genus => {
              let arr = []
              specieList.map(specie => {
                if (genus.loop[4] === specie.loop[4]) {
                  arr.push(specie.path)
                  genus.children = arr
                }
              })
            })

            arr = [...ordoList, ...familiaList, ...genusList, ...specieList, ...root]

            const nodes = this.convertArrayToObject(arr, 'path')
            console.log('results', results, 'rsArr', rsArray, 'a', nodes);
            console.log('ordo', ordoList, 'genus', genusList, 'familia', familiaList, 'specie', specieList);
            console.log(this.state);
            this.setState({ nodes })
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
      if (item.style === 'ordo')
        a.push(item)
    })
    return a
  }

  genusLoop = arr => {
    let a = []
    arr.map(item => {
      if (item.style === 'genus')
        a.push(item)
    })
    return a
  }

  familiaLoop = arr => {
    let a = []
    arr.map(item => {
      if (item.style === 'familia')
        a.push(item)
    })
    return a
  }

  specieLoop = arr => {
    let a = []
    arr.map(item => {
      if (item.style === 'specie')
        a.push(item)
    })
    return a
  }

  render() {
    console.log(this.props);
    const rootNodes = this.getRootNodes();

    return (

      <div className='explorer__phone-show'>


        {rootNodes.map(node => (
          <TreeNode
            key={node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
            handleRemoveOrdo={this.handleRemoveOrdo}
            handleRemoveFamilia={this.handleRemoveFamilia}
            handleRemoveSpecie={this.handleRemoveSpecie}
            handleRemoveGenus={this.handleRemoveGenus}
            handleAdd={this.handleAdd}
            handleSubmit={this.handleSubmit}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Tree)