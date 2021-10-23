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

import p1 from "../images/p1.jfif";
import p2 from "../images/p2.jfif";
import p3 from "../images/p3.jfif";
import p4 from "../images/p4.jfif";
import c1 from "../images/cam1.jpg";
import c2 from "../images/cam2.jfif";
import c3 from "../images/cam3.jpg";
import h1 from "../images/h1.jfif";
import h2 from "../images/h2.jfif";
import h3 from "../images/h3.jpg";
import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";
import g3 from "../images/g3.jpg";

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

  const [name, setName] = useState("");

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
    handleImageSubmit()
    setShow(true);
  };

  return (
    <div className="main-layout search-image__hinhnen">
      <div className="container" style={{ marginTop: "200px" }}>
        <div style={{ height: "100vh" }}>
          <div className="search-image__header__text-box">
            <h1 className="search-image__heading-primary">
              <span>Tìm bằng hình ảnh</span>
            </h1>
            <form className="search-image__form search-image__form-search-by-image">
              <img src={imageURL} style={{ height: "100%" }} />
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ borderBottom: "1px solid #dee2e6" }}>
          <Modal.Title>Kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            bg="Light"
            text="dark"
            style={{ width: "100%" }}
            className="mb-2"
          >
            <Card.Header>
            <Link to={`/details/${slug[0]}`}> {flower.label} </Link> <span style ={{marginRight:'5px'}}></span> - {Math.round(Number(flower.accuracy)*10000/100)} %
            </Card.Header>
            <Card.Body>
              <img
                src={imageURL}
                style={{ marginBottom: "16px" }}
              />
              <Card.Text>
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
