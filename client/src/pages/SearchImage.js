import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { getListOrdo } from "../api/ordo";
import { getListGenus } from "../api/genus";
import { getListFamilia } from "../api/familia";
import { getSpecies } from "../api/specie";
import { useTranslation } from "react-i18next";
import "../css/style.css";
import "../css/responsive.css";
import "../css/search.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocalSearch from "../component/form/LocalSearch";
import { getResultRecognize } from '../api/recognize'

import { Button, Modal, Card } from "react-bootstrap";

import "../index.css";

import icon_background from '../images/icon_background.png'
import icon_flower from '../images/icon_flower.png'
import icon_clove from '../images/icon_clove.png'
import icon_fruit from '../images/icon_fruit.png'
import icon_leaf from '../images/icon_leaf.png'
import icon_seed from '../images/icon_seed.png'

const SearchImage = () => {
  const [slug, setSlug] = useState([]);
  const [results, setResults] = useState([]);
  const [genus, setGenus] = useState("");
  const [img, setImg] = useState("");
  const [otherData, setOther] = useState("");
  const { search } = useSelector((state) => ({ ...state }));
  // const {text,genus,description} = search
  
  const { text } = search;
  const [note,setNote] = useState({})
  const [flower, setFlower] = useState({
    status: "",
    accuracy: "",
    predict: "",
    label: "",
  });
  const [keyword, setKeyword] = useState("");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabs = document.querySelectorAll('.operations__tab');
   const tabsContent = document.querySelectorAll('.operations__content');
  

  const [imageStatus, setImageStatus] = useState("Choose file to upload.");

  const [imageURL, setImageURL] = useState("");

  const loadPlantsQuery = () => {
    getListOrdo().then((resO) => {
      getListFamilia().then((resF) => {
        getListGenus().then((resG) => {
          getSpecies().then((resS) => {
            setResults([
              ...resO.data.map((item) => ({ ...item, type: "ordo" })),
              ...resF.data.map((item) => ({ ...item, type: "familia" })),
              ...resG.data.map((item) => ({ ...item, type: "genus" })),
              ...resS.data.map((item) => ({ ...item, type: "specie" })),
            ]);
          });
        });
      });
    });
  };

  console.log("res", results);

  // 1.Filter by Name
  useEffect(() => {
    loadPlantsQuery();
  }, [keyword]);

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

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

  const searched = (keyword) => (results) => {
    return results.name.toLowerCase().includes(keyword);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(false)
    handleImageSubmit()
    setShow(true);
  };

  const handleOperationClick = (e) => {
    const clicked = e.target.closest('.operations__tab');
    handleClose()
    setImageURL('')
    // Guard clause
    if (!clicked) return;
    else {
       // Remove active classes
       tabs.forEach(t => t.classList.remove('operations__tab--active'));
       tabsContent.forEach(c => c.classList.remove('operations__content--active'));

       // Activate tab
       clicked.classList.add('operations__tab--active');

       // Activate content area
       document
          .querySelector(`.operations__content--${clicked.dataset.tab}`)
          .classList.add('operations__content--active');
    }
    
 }  

  return (
    <div className="main-layout search-image__hinhnen">
      <div className="container" style={{ marginTop: "150px" }}>
        <div className ='wrapper-search__child' style={{ height: "100vh" }}>
          <div className="search-image__header__text-box">
            <h1 className="search-image__heading-primary">
              <span>Tìm bằng hình ảnh</span>
            </h1>
            <div className="operations">
            <div className="operations__tab-container" style ={{marginLeft:'24px'}} onClick = {handleOperationClick}>
                <button
                  className="btn operations__tab operations__tab--1 operations__tab--active"
                  data-tab="1"
                >
                  <img style ={{height:'50px',width:'50px'}} src ={icon_background} alt='bg' />
                </button>
                <button className="btn operations__tab operations__tab--2" data-tab="2">
                <img style ={{height:'50px',width:'50px'}} src ={icon_clove} alt='bg' />
                </button>
                <button className="btn operations__tab operations__tab--3" data-tab="3">
                <img style ={{height:'50px',width:'50px'}} src ={icon_flower} alt='bg' />
                </button>
                <button className="btn operations__tab operations__tab--4" data-tab="4">
                <img style ={{height:'50px',width:'50px'}} src ={icon_fruit} alt='bg' />
                </button>
                <button className="btn operations__tab operations__tab--5" data-tab="5">
                <img style ={{height:'50px',width:'50px'}} src ={icon_leaf} alt='bg' />
                </button>
                <button className="btn operations__tab operations__tab--6" data-tab="6">
                <img style ={{height:'50px',width:'50px'}} src ={icon_seed} alt='bg' />
                </button>
                
            </div>
            <div className="operations__content operations__content--1 operations__content--active">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--1 operations__content--active">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--2">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--3">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--4">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--5">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            <div className="operations__content operations__content--6">
              <form className="search-image__form search-image__form-search-by-image">
                <img src={imageURL} style={{ height:'100%' }} />
                <input
                  
                  type="file"
                  accept="image/*"
                  onChange={fileUpload}
                />

                {imageStatus != null ? <p>{imageStatus}</p> : null}

                <button type="button" onClick={handleShow}>
                  Upload
                </button>
              </form>
            </div>
            
            
          </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ borderBottom: "1px solid #dee2e6" }}>
          <Modal.Title>Kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            bg="Light"
            text="dark"
            style={{ width: "50%" }}
            className="mb-2"
          >
            <Card.Header>
            <Link to={`/details-specie/canavalia-cathartica-thouars`}> {flower.label || 'name'} </Link> <span style ={{marginRight:'5px'}}></span> - {Math.round(Number(flower.accuracy)*10000/100)} %
            </Card.Header>
            <Card.Body>
              <img
                src={imageURL}
                style={{ marginBottom: "16px" }}
              />
              <Card.Text>
                {JSON.stringify(flower)}
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchImage;
