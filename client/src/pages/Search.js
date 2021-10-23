import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar,Badge } from 'antd'
import {Link} from 'react-router-dom'
import { getListOrdo } from '../api/ordo'
import { getListGenus } from '../api/genus'
import { getListFamilia } from '../api/familia'
import { getSpecies } from '../api/specie'
import { getResultRecognize } from '../api/recognize'
import { useTranslation } from 'react-i18next'
import '../css/style.css'
import '../css/responsive.css'
import '../css/search.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/bootstrap.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocalSearch from '../component/form/LocalSearch'
import { Button, Modal, Card } from "react-bootstrap";
import '../index.css'

import p1 from '../images/p1.jfif'
import p2 from '../images/p2.jfif'
import p3 from '../images/p3.jfif'
import p4 from '../images/p4.jfif'
import c1 from '../images/cam1.jpg'
import c2 from '../images/cam2.jfif'
import c3 from '../images/cam3.jpg'
import h1 from '../images/h1.jfif'
import h2 from '../images/h2.jfif'
import h3 from '../images/h3.jpg'
import g1 from '../images/g1.jpg'
import g2 from '../images/g2.jpg'
import g3 from '../images/g3.jpg'
import { node } from 'prop-types'

const Search = () => {
    const [slug,setSlug] = useState([])
    const [results,setResults] = useState([])
    const [genus,setGenus] = useState('')
     const [show, setShow] = useState(false);

    const {search} = useSelector(state => ({...state}))
    // const {text,genus,description} = search
    const [description,setDescription] = useState('')
    const [ordos,setOrdos] = useState([])
    const [familias,setFamilias] = useState([])
    const [listGenus,setListGenus] = useState([])
    const [species,setSpecies] = useState([])
    const {text} = search
    const [plant,setPlant] = useState({status:'',accuracy:'',predict:'',label:''})
    const [keyword,setKeyword] = useState('')
    const [note,setNote] = useState({})
    const [flower, setFlower] = useState({
        status: "",
        accuracy: "",
        predict: "",
        label: "",
    });
    const [imageStatus, setImageStatus] = useState("Choose file to upload.");

    const [imageURL, setImageURL] = useState("");

    const {t} = useTranslation()
    const dispatch = useDispatch()

    const [name,setName] = useState('')

    const loadPlantsQuery = () => {
      
        getListOrdo().then(resO => {
            getListFamilia().then(resF => {
                getListGenus().then(resG => {
                    getSpecies().then(resS => {
                        setResults([...resO.data.map(item => ({...item,type:'ordo'})),
                        ...resF.data.map(item => ({...item,type:'familia'})),
                        ...resG.data.map(item => ({...item,type:'genus'})),
                        ...resS.data.map(item => ({...item,type:'specie'}))
                        ])
                    })
                })
            })
        })
    }
 
    console.log('res',results);

    // 1.Filter by Name
    useEffect(() => {
        loadPlantsQuery()
       
    },[keyword])

    const handleChange = e => {
        dispatch({
          type:'SEARCH_QUERY',
          payload: { text:e.target.value}
        })
    }

    const handleImageSubmit = async (e) => {
        console.log(note);
        getResultRecognize(note).then(res => {
          setFlower({label:res.data.label,accuracy:res.data.accuracy})
          console.log(res.data);
        })
      }
    
      const fileUpload = async e => {
        setNote(e.target.files[0])
        setImageStatus(null);
        if (e.target.files && e.target.files[0]) {
          var reader = new FileReader();
          var file = e.target.files[0];
          setImageURL(URL.createObjectURL(file));
          console.log("dcm" + imageURL != null);
        }
    }

    const handleClose = () => {
        setShow(false);
      };
      const handleShow = () => {
        handleImageSubmit()
        setShow(true);
      };
       

    const searched = keyword => results => {
        return results.name.toLowerCase().includes(keyword)
    }

    return (
        <div className="main-layout search-image__hinhnen">
        <div className="container" style={{ marginTop: "200px" }}>
            
          <div style={{ height: "80vh" }}>
              
            <div className="search-image__header__text-box">
              <h1 className="search-image__heading-primary">
                <span>{t('searchByName')}</span>
                <hr />
              </h1>
                    <div className="search-inf__form">
        
                    <div className="form-control1">
            
            <LocalSearch
                keyword = {keyword}
                setKeyword = {setKeyword}
            />
            <div className="search-info__result">
                
                
                <div className="search-inf__list search-inf__list--scrool">
                    { keyword && results.filter(searched(keyword)).map(rs => {
                        return <div key ={rs._id}>
                            <div className="list-item-inf" style={{marginLeft: '5%'}}>
                            
                            <Link to={rs.type === 'specie' ? `/details-specie/${rs.slug}` :  `/details-${rs.type}/${rs.slug}`}> {rs.name}
                            <input type="submit" className="detail" value="Detail" />
                            </Link>
                        </div>
                            </div>
                    })}
                </div>
                </div>
                </div>
               
                </div>
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default Search