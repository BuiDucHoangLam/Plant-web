import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import {createSpecie,getSpecie,editSpecie} from '../../../api/specie'
import {getGenus,getListGenus} from '../../../api/genus'
import {getOrdoListFamilia,getListOrdo} from '../../../api/ordo'
import {getFamiliaListGenus, getListFamilia} from '../../../api/familia'
import FileUpload from '../../../component/form/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import { useTranslation } from "react-i18next";

import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import SpecieEditForm from '../../../component/form/SpecieEditForm'

const initialState = {
  name:'tower of god',
  vnName:'the boy of the death',
  ordo:'',
  
  familia:'',
  familiaList:[],
  genus:'',
  genusList:[],
  synonyms:[],
  synonymsList:'',
  description:'Melancholic Palms',
  value:'no need to use the sixth palm',
  images:{background:[],leave:[],flower:[],fruit:[]},
  distribution:'everywhere',
  coordinates:[],
  longitude:'',
  latitude:'',
  coordinatesList:'',
  source:'internet',
  fruitSeason:'',
  enDescription:'',
  enDistribution:'',
  enSource:'',
  enValue:'',
  enName:''
}

const SpecieEdit = ({match}) => {
  const [values,setValues] = useState(initialState)
  const [ordoList,setOrdoList] = useState([])
  const [genusOptions,setGenusOptions] = useState([])
  const [familiaOptions,setFamiliaOptions] = useState([])
  const [showGenus,setShowGenus] = useState(false)
  const [showFamilia,setShowFamilia] = useState(false)
  const [loading,setLoading] = useState(false)

  const {slug} = match.params
  console.log(slug);
  const {user} = useSelector(state => ({...state}))
  const {t} = useTranslation()
  const i = 0

  const loadSpecie = () => {
    getSpecie(slug).then(res => {
      setValues({...values,...res.data})
      getOrdoListFamilia(res.data.ordo).then(f => {
        setFamiliaOptions(f.data)
        console.log('familia',f.data);
        getFamiliaListGenus(f.data[0]._id).then(g => {
          console.log('genus',g.data);
          setGenusOptions(g.data)
        })
      })
      console.log(res.data);
    })
  }

  // useEffect(() => {
  //   loadOrdoList()
    
  // },[])

  useEffect(() => {
    loadOrdoList()
    loadSpecie()
  },[slug])

  

  const loadOrdoList = () => {
    getListOrdo().then(res => {
      setOrdoList(res.data)
      console.log(res.data);
    })
  }

  const loadGenusList = () => {
    getListGenus().then(res => {
      setValues({...values,genusList:res.data})
    })
  }

  const loadFamiliaList = () => {
    getListFamilia().then(res => {
      setValues({...values,familiaList:res.data})
    })
  }

  const combineArray = (a,b) => {
    let c = []
    for(let i = 0;i<b.length;i++) {
      let d = []
      d.push(a[i],b[i])
      c.push(d)
    }
    return c
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    let array1 = []
    let array2  = []
    let array3  = []
    let array4  = []
    document.querySelector('.coord-form').childNodes.forEach(c => {
      if(c.className === 'row') {
        c.childNodes.forEach(cc => {
          if(cc.className === 'col-md-6') {
            cc.childNodes.forEach(n => {
              console.log(n.name);
              if(n.name === 'longitudeList' && n.value){
                const arrLong = n.value.trimStart().trimEnd().split(' ').filter(el => el !== '')
                if(arrLong) {
                  array1.push(arrLong)
                  const long = Number(arrLong[0]) + Number(arrLong[1])/60 + Number(arrLong[2])/3600
                  array2.push(long)
                }
               
              } 
              else if(n.name === 'latitudeList' && n.value) {
                const arrLat = n.value.trimStart().trimEnd().split(' ').filter(el => el !== '')
                if(arrLat) {
                  array3.push(arrLat)
                  const lat = Number(arrLat[0]) + Number(arrLat[1])/60 + Number(arrLat[2])/3600
                  array4.push(lat)
                }
                
                setValues({...values,
                  longitudeList:array1,
                  longitude:array2.filter(el => el !== null),
                  latitudeList:array3,
                  latitude:array4.filter(el => el !== null),
                  coordinates:combineArray(array2,array4)
                })
              }
                      
            });
          }
        })
      }
    })
    editSpecie(user.token,slug,values).then(res => {
      console.log(res.data);
      window.alert('Thành công!')
      window.location.reload()
    }).catch(err => {
      console.log(err);
      // if(err.response.status === 400) toast.error(err.response.data)
      toast.error(err.response.data.err)
    })
  }

  const handleChange = e => {
    e.preventDefault()
    setValues({...values,[e.target.name]:e.target.value})
    console.log(e.target.name,e.target.value);
  }

  const handleFamiliaChange = e => {
    e.preventDefault()
    console.log('Click familia',e.target.value);
    setValues({...values,familia:e.target.value})
    getFamiliaListGenus(e.target.value).then(res => {
      console.log('genus list of familia',res.data);
      setGenusOptions(res.data)
    })
    setShowGenus(true)
  }

  const handleOrdoChange = e => {
    e.preventDefault()
    console.log('Click ordo',e.target.value);
    setValues({...values,ordo:e.target.value})
    getOrdoListFamilia(e.target.value).then(res=>{
      console.log('genus familia of ordo',res.data);
      setFamiliaOptions(res.data)
      getFamiliaListGenus(res.data[0]._id).then(g => {
        console.log('genus',g.data);
        setGenusOptions(g.data)
      })
    })
    setShowFamilia(true)
  }

  const handleSynonymsChange = e => {
    e.preventDefault()
    setValues({...values,synonymsList:e.target.value,synonyms:e.target.value.split(';')})

    console.log(e.target.name,e.target.value);
  }

  const transToArray = a => {
    let kq = []
    let rs = []
  
    const b = a.split(' ')
    const e = b.map(item => item.includes('\t') ? item.split('\t') : item).flat()
  
    while(e.length > 0) {
      kq.push(e.slice(0,3))
      e.splice(0,3)
    }
  
    while(kq.length > 0) {
      rs.push(kq.slice(0,2))
      kq.splice(0,2)
    }
  
    const alo = rs.map(item => item.map(i => {
      return (Number(i[0]) + Number(i[1])/60 + Number(i[2])/3600);
    }))
  
    return alo
  }

  const transformToCoord = a => {
    const b =  a.split(' ')
    return Number(b[0]) +  Number(b[1])/60 + Number(b[2])/3600
  }

  const handleLongitudeChange = e => {
    e.preventDefault()
    setValues({...values,longitude:e.target.value})
  }

  const handleLatitudeChange = e => {
    e.preventDefault()
    setValues({...values,latitude:e.target.value})
  }

  const handleCoordinatesChange = e => {
    e.preventDefault()
    const arr = transToArray(e.target.value)
    setValues({...values,coordinatesList:e.target.value,coordinates:arr})
    console.log(e.target.name,e.target.value);
    
    // const arr = transformToCoord(e.target.value)
    // setValues({...values,[e.target.name]:e.target.value,coordinatesList:arr})
    // const a = document.querySelector('coord-form').
    // console.log(a);
  }

  const handleAddCoord = () => {
    const html = `<div class="row">
      <div class="col-md-6">
        <input 
          type="text" 
          name = 'longitudeList'
          class = 'form-control' 
        
        />  
      </div>
      <div class="col-md-6">
        <input 
          type="text" 
          name = 'latitudeList'
          class = 'form-control' 
      
        />  
      </div>
    </div>  `

    document.getElementById('addCoord').insertAdjacentHTML('beforebegin',html)
    let array1 = []
    let array2  = []
    let array3  = []
    let array4  = []
    document.querySelector('.coord-form').childNodes.forEach(c => {
      if(c.className === 'row') {
        c.childNodes.forEach(cc => {
          if(cc.className === 'col-md-6') {
            cc.childNodes.forEach(n => {
              console.log(n.name);
              if(n.name === 'longitudeList' && n.value){
                const arrLong = n.value.trimStart().trimEnd().split(' ').filter(el => el !== '')
                if(arrLong) {
                  array1.push(arrLong)
                  const long = Number(arrLong[0]) + Number(arrLong[1])/60 + Number(arrLong[2])/3600
                  array2.push(long)
                  console.log('arr1',array1);
                  console.log('arr2',array2);
                }
               
              } 
              else if(n.name === 'latitudeList' && n.value) {
                const arrLat = n.value.trimStart().trimEnd().split(' ').filter(el => el !== '')
                if(arrLat) {
                  array3.push(arrLat)
                  const lat = Number(arrLat[0]) + Number(arrLat[1])/60 + Number(arrLat[2])/3600
                  array4.push(lat)
                  console.log('arr3',array3);
                  console.log('arr4',array4);
                }
                
                setValues({...values,
                  longitudeList:array1,
                  longitude:array2.filter(el => el !== null),
                  latitudeList:array3,
                  latitude:array4.filter(el => el !== null),
                  coordinates:combineArray(array2,array4)
                })
              }
                      
            });
          }
        })
      }
    })
  }

  return (
    <div className="container-fluid" style ={{marginTop:'200px'}}>
    <div className = "row">
      <div className ="col-md-2">
        <Nav />
      </div>
        
      <div className ='col-md-10'>
       
        {loading ? <LoadingOutlined className ='text-danger' /> : <h4>{t('createSpecie')}</h4>}
        <hr />
        {JSON.stringify(values)}
        <div className="row">
          <div className="col-md-4">
            <FileUpload 
              children = 'background'
              values ={values}
              setValues= {setValues}
              setLoading = {setLoading}
              name = {t('chooseImageBackground')}
            />
          </div>
          <div className="col-md-4">
            <FileUpload 
              children = 'flower'
              values ={values}
              setValues= {setValues}
              setLoading = {setLoading}
              name = {t('chooseImageFlower')}
            />
          </div>
          <div className="col-md-4">
            <FileUpload 
              children = 'leave'
              values ={values}
              setValues= {setValues}
              setLoading = {setLoading}
              name = {t('chooseImageLeave')}
            />
          </div>
          <div className="col-md-4">
            <FileUpload 
              children = "fruit"
              values ={values}
              setValues= {setValues}
              setLoading = {setLoading}
              name = {t('chooseImageFruit')}
            />
          </div>
          
        </div>

        <SpecieEditForm
          handleSubmit = {handleSubmit}
          handleChange ={handleChange}
          values = {values}
          handleOrdoChange = {handleOrdoChange}
          handleFamiliaChange = {handleFamiliaChange}
          showGenus = {showGenus}
          showFamilia = {showFamilia}
          genusOptions = {genusOptions}
          familiaOptions = {familiaOptions}
          handleSynonymsChange = {handleSynonymsChange}
          handleCoordinatesChange ={handleCoordinatesChange}
          handleLatitudeChange = {handleLatitudeChange}
          handleLongitudeChange = {handleLongitudeChange}
          index = {i}
          ordoList = {ordoList}
          handleAddCoord = {handleAddCoord}
        />
      </div>
    </div>
  </div>
  )
}

export default SpecieEdit