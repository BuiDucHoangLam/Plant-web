import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar,Badge } from 'antd'
import {Link} from 'react-router-dom'
import { getListOrdo } from '../api/ordo'
import { getListGenus } from '../api/genus'
import { getListFamilia } from '../api/familia'
import { getSpecies } from '../api/specie'
import { useTranslation } from 'react-i18next'
import '../css/style.css'
import '../css/responsive.css'
import '../css/search.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/bootstrap.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocalSearch from '../component/form/LocalSearch'

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

const Search = () => {
    const [slug,setSlug] = useState([])
    const [results,setResults] = useState([])
    const [genus,setGenus] = useState('')
    const [img,setImg] = useState('')
    const [otherData,setOther] = useState('')
    const {search} = useSelector(state => ({...state}))
    // const {text,genus,description} = search
    const [description,setDescription] = useState('')
    const [ordos,setOrdos] = useState([])
    const [familias,setFamilias] = useState([])
    const [listGenus,setListGenus] = useState([])
    const [species,setSpecies] = useState([])
    const {text} = search
    const [flower,setFlower] = useState({status:'',accuracy:'',predict:'',label:''})
    const [keyword,setKeyword] = useState('')

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

    const handleSubmit = e => {
        e.preventDefault()
       
    }

    const fileUpload = e => {
        const file = e.target.files
        console.log(file);
        if(file[0]) {

            const reader = new FileReader()
            setImg(file)
            reader.onload = ()  => {
                if(reader.readyState === 2){
                    setImg(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
            console.log(document.querySelector('#file_input_file').value);
        }
        console.log(img);
    }

    const handleImageRemove = () => {
        setImg('')   
    }

    const searched = keyword => results => {
        return results.name.toLowerCase().includes(keyword)
    }

    return (
    <div className="main-layout">

     <div className="container" style={{marginTop: '200px'}}>
        <div className="row">
           <div className="col-md-12 ">
              <div className="titlepage">
                 <h2>{t('searchByImage')}</h2>
                 {/* <!-- <span>looking at its layout. The point of using Lorem Ipsumletters, as opposed to usingl</span> --> */}
              </div>
           </div>
        </div>
     </div>

    <div className="search-img">
        <div className="search-img__title">

        </div>

        <div className="search-img__body">
            <div className="search-img__uploadfile">
                {/* <!-- <div className="wrap"> --> */}
                    <div className="dandev-reviews">
                        <div className="form_upload">
                            <label className="dandev_insert_attach"><span><i className="ti-camera"></i> {t('searchByImage')}</span></label>
                        </div>
                        <div className="list_attach">
                            <ul className="dandev_attach_view">

                            </ul>
                            {img && <Badge 
                                className='m-3'
                                key={2} 
                                count='x' 
                                onClick = {()=>handleImageRemove()}
                                style={{cursor:'pointer'}}
                            >
                                <img className ='img-input' src ={img} alt = 'input' />
                            
                            {/* placeholder= {<span className="dandev_insert_attach"><i className="dandev-plus">+</i></span>} */}
                            </Badge> }
                            <a href="http://localhost:5000/upload-image">
                           <div>{t('chooseImage')}</div>
                            </a>
                        </div>
                    </div>
                {/* <!-- </div> --> */}

                <div>
                    
                    <input type='submit' className="img_search" value={t('search')} />
                    
                </div>
            </div>

            <div className="search-img__result">
                <div className="result_title"> 
                    <p style={{fontSize: '18px'}}>{t('searchResult')}</p> 
                </div>
                <div id = "search-img__list" className="search-img__list hidden">
                    {/* <div className="list-item">
                        <img src={p1} alt="" />
                        <a href="">Aizoon canariense L.</a>
                    </div> */}
                     <div className="list-item">
                        <img src={c1} alt="" />
                        <Link to={`/details/${slug[0]}`}> Cẩm tú cầu </Link>
                    </div> 
                    <div className="list-item">
                        <img src={h1} alt="" />
                        <Link to={`/details/${slug[1]}`}> Hoa hồng</Link>
                    </div>
                    <div className="list-item">
                        <img src={g1} alt="" />
                        <Link to={`/details/${slug[2]}`}> Hoa giấy</Link>
                    </div>
                </div>

                
            </div>
        </div>
    </div>

    <div className="container">
        <div className="row">
           <div className="col-md-12 ">
              <div className="titlepage">
                 <h2>{t('searchByInformation')}</h2>
              </div>
           </div>
        </div>
     </div>

    <div className="search-inf">
        <div className="search-inf__title">

        </div>

        <div className="search-inf__body">
            <div className="search-inf__form">
               
                <div className="form-control1">
                    <p>{t('insertName')}: </p> 
                    <LocalSearch
                        keyword = {keyword}
                        setKeyword = {setKeyword}
                    />
                </div>
               
               
                <div>
                    {/* <a href="/details"> */}
                    <input type="submit" className="inf_search" value={t('search')} onClick ={handleSubmit} />
                    {/* </a> */}
                </div>
            </div>
    
            <div className="search-info__result">
                
                    <div className="result_title"> 
                        <p style={{fontSize: '18px'}}>{t('searchResult')}</p> 
                    </div>
                <div className="search-inf__list search-inf__list--scrool">
                    { 
                    keyword 
                    && results.filter(searched(keyword)).map(rs => {
                        return <div key ={rs._id}>
                            <div className="list-item-inf" style={{marginLeft: '5%'}}>
                            {/* <a href="/details">{rs.name}</a> */}
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
  )
}

export default Search
