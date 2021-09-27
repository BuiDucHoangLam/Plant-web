import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar,Badge } from 'antd'
import {Link} from 'react-router-dom'
import { getPlants,getPlantsFilter } from '../api/plant'
import { getResultSearch } from '../api/search'
import '../css/style.css'
import '../css/responsive.css'
import '../css/search.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/bootstrap.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    const [bibliography,setBibliography] = useState('')
    const [source,setSource] = useState('')
    const [distribution,setDistribution] = useState('')
    const {text} = search
    const [flower,setFlower] = useState({status:'',accuracy:'',predict:'',label:''})

    const dispatch = useDispatch()

    const [name,setName] = useState('')

    const loadPlantsQuery = (arg) => {
        getPlantsFilter(arg).then(res => {
            setResults(res.data)
        })
    }

    // 1.Filter by Name
    useEffect(() => {
        loadPlantsQuery({name:text})
    },[text])

    // 2. Filter by Genus
    useEffect(() => {
        loadPlantsQuery({genus:genus})
    },[genus])

    useEffect(() => {
        loadPlantsQuery({description:description})
    },[description])

    useEffect(() => {
        loadPlantsQuery({otherData:otherData})
    },[otherData])



    const loadSearchByImage = () => 
        //  getPlants().then(res => {
        //      const arr = []
        //     res.data.map(r => arr.push(r.slug))
        //     setSlug(arr)
        // })
        getResultSearch().then(res =>{
            // setFlower(res.data)
            // console.log(flower);
            console.log(res.data)
        })
        .then(document.getElementById('search-img__list').classList.remove('hidden'))
        .catch(err => console.log(err))

    console.log(slug);

    const handleChange = e => {
        dispatch({
          type:'SEARCH_QUERY',
          payload: { text:e.target.value}
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        getPlants().then(res => {
            console.log(res.data);
            setResults(res.data)
        }).catch(err => console.log(err))
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
  return (
    <div className="main-layout">

     <div className="container" style={{marginTop: '200px'}}>
        <div className="row">
           <div className="col-md-12 ">
              <div className="titlepage">
                 <h2>Search By Image</h2>
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
                            <label className="dandev_insert_attach"><span><i className="ti-camera"></i> Choose the image</span></label>
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
                           <div>Chọn tệp</div>
                            </a>
                        </div>
                    </div>
                {/* <!-- </div> --> */}

                <div>
                    
                    <input type='submit' className="img_search" value="Search" onClick ={loadSearchByImage}/>
                    
                </div>
            </div>

            <div className="search-img__result">
                <div className="result_title"> 
                    <p style={{fontSize: '18px'}}>Search Result</p> 
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
                 <h2>Search By Infomation</h2>
                 {/* <!-- <span>looking at its layout. The point of using Lorem Ipsumletters, as opposed to usingl</span> --> */}
              </div>
           </div>
        </div>
     </div>

    <div className="search-inf">
        <div className="search-inf__title">

        </div>

        <div className="search-inf__body">
            <div className="search-inf__form">
                {/* <div className="form-control1">
                    <p>Family (họ) (50): </p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Plant Type (loại TV) (50):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Life form (Dạng sống) (50):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Ecotypes (Loài sinh thái):</p> <span><input type="radio" />Yes</span>  <span className="radio"><input type="radio" />No</span>
                </div>
                <div className="form-control1">
                    <p>Salinity (Độ mặn) (dS/m):</p> <span><input type="radio" />Seawater</span> <span className="radio"><input type="radio" />Not over</span> <span><input type="radio" />Range</span>
                </div>
                <div className="form-control1">
                     <span className="range">Min <input type="text" className="item-mini" /></span> <span style={{marginLeft: '30px'}}> Max <input type="text" className="item-mini" /> </span>
                </div>
                <div className="form-control1">
                    <p>Germination (Nảy mầm):</p> <span><input type="radio" />Yes</span> <span className="radio"><input type="radio" />No</span>
                </div>
                <div className="form-control1">
                    <p>Photosyntheses Pathway (Con đường quang hợp):</p> <span><input type="radio" />Yes</span> <span className="radio"><input type="radio" />No</span>
                </div>
                <div className="form-control1">
                    <p>Microbial interactions and mycorrhizal status (Tương tác vi sinh vật và tình trạng nấm rễ): </p> <br/> <span><input type="radio" />Yes</span> <span style={{marginLeft: '20px'}}><input type="radio" />No</span>
                </div>
                <div className="form-control1">
                    <p>Bioremediation (Sửa chữa sinh học):</p> <span><input type="radio" />Yes</span> <span className="radio"><input type="radio" />No</span>
                </div>
                <div className="form-control1">
                    <p>Molecular data (Dữ liệu phân tử) (50):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Antioxidants (Chất chống oxy hóa) (50):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Secondary metabolites (Chất chuyển hóa thứ cấp): </p><select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Compatible solutes (chất hòa tan tương thích):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Habitat (Nơi sống) (50):</p> <select name="" className="item"></select>
                </div>
                <div className="form-control1">
                    <p>Economic use (Sử dụng kinh tế) (50):</p> <select name="" className="item"></select>
                </div> */}
                <div className="form-control1">
                    <p>Tên: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={handleChange}
                            type='search' 
                            value ={text} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Name'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Loài: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setGenus(e.target.value)}
                            type='search' 
                            value ={genus} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Genus'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Miêu tả: </p>
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setDescription(e.target.value)}
                            type='search' 
                            value ={description} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Name'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Phân bổ: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setDistribution(e.target.value)}
                            type='search' 
                            value ={distribution} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Name'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Thông tin: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setOther(e.target.value)}
                            type='search' 
                            value ={otherData} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Data'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Lược sử: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setBibliography(e.target.value)}
                            type='search' 
                            value ={bibliography} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Bibliography'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
                <div className="form-control1">
                    <p>Nguồn tin: </p> 
                    <form style={{display:'flex',background:'none',padding:'0px'}}  onSubmit={handleSubmit}>
                        <input 
                            onChange ={e => setSource(e.target.value)}
                            type='search' 
                            value ={source} 
                            className ='form-control mr-sm-2'
                            placeholder='Search Source'
                        />
                        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer',fontSize:'x-large',display: 'flex',alignItems:'center'}}/>
                    </form>
                </div>
               
                <div>
                    {/* <a href="/details"> */}
                    <input type="submit" className="inf_search" value="Search" onClick ={handleSubmit} />
                    {/* </a> */}
                </div>
            </div>
    
            <div className="search-info__result">
                <div className="search-inf__img">
                    <img src={p4} alt="" />
                </div>
                    <div className="result_title"> 
                        <p style={{fontSize: '18px'}}>Search Result</p> 
                    </div>
                <div className="search-inf__list search-inf__list--scrool">
                    {!results.length === 0 
                    ? <div className="list-item-inf" style={{marginLeft: '5%'}}>
                        NO results
                        </div>
                    : results.map(rs => {
                        return <div key ={rs._id}>
                            <div className="list-item-inf" style={{marginLeft: '5%'}}>
                            {/* <a href="/details">{rs.name}</a> */}
                            <Link to={`/details/${rs.slug}`}> {rs.name}
                            <input type="submit" className="detail" value="Detail" />
                            </Link>
                    </div>
                        </div>
                    })}
                    {/* <div className="list-item-inf" style={{marginLeft: '5%'}}>
                        <a href="/details">1. Aizoon canariense L.</a>
                        <input type="submit" className="detail" value="Detail" />
                    </div>
                    <div className="list-item-inf" style={{marginLeft: '5%'}}>
                        <a href="/details">2. Carpobrotus chilensis (Molina) N.E.Br.</a>
                        <input type="submit" className="detail" value="Detail" />
                    </div>
                    <div className="list-item-inf" style={{marginLeft: '5%'}}>
                        <a href="/details">3. Carpobrotus edulis (L.) N.E.Br.</a>
                        <input type="submit" className="detail" value="Detail" />
                    </div> */}
                </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default Search
