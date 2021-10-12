import React,{useEffect, useState} from 'react'
import Nav from '../../../component/Nav'
import {createSpecie} from '../../../api/specie'
import {getGenus,getListGenus} from '../../../api/genus'
import {getOrdoListFamilia,getListOrdo} from '../../../api/ordo'
import {getFamiliaListGenus, getListFamilia} from '../../../api/familia'
import FileUpload from '../../../component/form/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
import { useTranslation } from "react-i18next";

import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import SpecieCreateForm from '../../../component/form/SpecieCreateForm'

import '../../../css/style.css'
import '../../../css/responsive.css'
import '../../../css/bootstrap.min.css'


const initialState = {
  name:'tower of god',
  vnName:'the boy of the death',
  ordo:'',
  ordoList:[],
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
  longitudeList:[],
  latitudeList:[],
  coordinatesList:[],
  source:'internet',
  fruitSeason:'',
  enDescription:'',
  enDistribution:'',
  enSource:'',
  enValue:'',
  enName:''
}

const SpecieCreate = () => {
  const [values,setValues] = useState(initialState)
  const [genusOptions,setGenusOptions] = useState([])
  const [familiaOptions,setFamiliaOptions] = useState([])
  const [showGenus,setShowGenus] = useState(false)
  const [showFamilia,setShowFamilia] = useState(false)
  const [loading,setLoading] = useState(false)

  const {user} = useSelector(state => ({...state}))
  const {t} = useTranslation()
  const i = 0

  useEffect(() => {
    loadOrdoList()
    
  },[])

  const loadOrdoList = () => {
    getListOrdo().then(res => {
      setValues({...values,ordoList:res.data})
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
    createSpecie(user.token,values).then(res => {
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

  const handleLongitudeChange = e => {
    e.preventDefault()
    setValues({...values,longitude:e.target.value})
  }

  const handleLatitudeChange = e => {
    e.preventDefault()
    setValues({...values,latitude:e.target.value})
  }

  const handleCoordinatesChange = () => {
    
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

    
  }

  return (
    <div className="container-fluid" style ={{marginTop:'200px'}}>
    <div className = "row">
      <div className ="col-md-2">
        <Nav />
      </div>
        
      <div className ='col-md-10'>
       
        {loading ? <LoadingOutlined className ='text-danger' /> : <h3  style ={{textAlign:'center'}}>{t('createSpecie')}</h3>}
        <hr />
        {/* {JSON.stringify(values)} */}
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

        <SpecieCreateForm
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
          handleAddCoord  ={handleAddCoord}
          index = {i}
        />
      </div>
    </div>
  </div>
  )
}

export default SpecieCreate
