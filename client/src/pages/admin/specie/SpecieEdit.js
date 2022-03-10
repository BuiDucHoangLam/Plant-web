import React, { useEffect, useState } from 'react'
import Nav from '../../../component/Nav'
import { createSpecie, getSpecie, editSpecie } from '../../../api/specie'
import { getGenus, getListGenus } from '../../../api/genus'
import { getOrdoListFamilia, getListOrdo } from '../../../api/ordo'
import { getFamiliaListGenus, getListFamilia } from '../../../api/familia'
import FileUploadLocal from '../../../component/form/FileUploadLocal'
import { LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import '../../../index.css'
import '../../../css/responsive.css'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SpecieEditForm from '../../../component/form/SpecieEditForm'

const initialState = {
  name: 'tower of god',
  vnName: 'the boy of the death',
  ordo: '',

  familia: '',
  familiaList: [],
  genus: '',
  genusList: [],
  synonyms: [],
  synonymsList: '',
  description: 'Melancholic Palms',
  value: 'no need to use the sixth palm',
  images: {
    imagesBackground: [],
    imagesLeave: [],
    imagesClove: [],
    imagesFlower: [],
    imagesFruit: [],
    imagesSeed: [],
  },
  distribution: 'everywhere',
  coordinates: [],
  longitude: '',
  latitude: '',
  longitudeList: [],
  latitudeList: [],
  coordinatesList: '',
  source: 'internet',
  fruitSeason: '',
  enDescription: '',
  enDistribution: '',
  enSource: '',
  enValue: '',
  enName: ''
}

const SpecieEdit = ({ match }) => {
  const [values, setValues] = useState(initialState)
  const [ordoList, setOrdoList] = useState([])
  const [genusOptions, setGenusOptions] = useState([])
  const [familiaOptions, setFamiliaOptions] = useState([])
  const [showGenus, setShowGenus] = useState(false)
  const [showFamilia, setShowFamilia] = useState(false)
  const [loading, setLoading] = useState(false)
  const [coordinatesList, setCoordinatesList] = useState([{latitude: '', longitude: '' }])

  const history = useHistory()

  const { slug } = match.params
  console.log(slug);
  const { user } = useSelector(state => ({ ...state }))
  const { t } = useTranslation()
  const i = 0

  const loadSpecie = () => {
    getSpecie(slug).then(res => {
      setValues({ ...values, ...res.data })
      setCoordinatesList(res.data.coordinatesList)
      getOrdoListFamilia(res.data.ordo).then(f => {
        setFamiliaOptions(f.data)
        console.log('familia', f.data);
        getFamiliaListGenus(f.data[0]._id).then(g => {
          console.log('genus', g.data);
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
  }, [slug])

  console.log(coordinatesList);

  const loadOrdoList = () => {
    getListOrdo().then(res => {
      setOrdoList(res.data)
      console.log(res.data);
    })
  }

  const loadGenusList = () => {
    getListGenus().then(res => {
      setValues({ ...values, genusList: res.data })
    })
  }

  const loadFamiliaList = () => {
    getListFamilia().then(res => {
      setValues({ ...values, familiaList: res.data })
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    let array1 = []
    let array3 = []

    coordinatesList.length > 0 && coordinatesList.map(coord => {
      let objItem = {latitude:0,longitude:0}
      const arrLat = coord.latitude.trimEnd().trimStart().split(' ').filter(el => el !== '')
      if (arrLat && arrLat.length > 0) array1.push(arrLat)
      let lat = 0
      if(arrLat.length === 1) {
        lat = Number(arrLat[0])

      }
      if(arrLat.length === 2) {
        lat = Number(arrLat[0]) + (Number(arrLat[1]) / 60)
      }
      if(arrLat.length >= 3) {
        lat = Number(arrLat[0]) + (Number(arrLat[1]) / 60) + Number(arrLat[2]) / 3600
      }

      const arrLong = coord.longitude.trimEnd().trimStart().split(' ').filter(el => el !== '')
      if (arrLong && arrLong.length > 0) array1.push(arrLong)
      let long = 0
      if(arrLong.length === 1) {
        long = Number(arrLong[0])

      }
      if(arrLong.length === 2) {
        long = Number(arrLong[0]) + (Number(arrLong[1]) / 60)
      }
      if(arrLong.length >= 3) {
        long = Number(arrLong[0]) + (Number(arrLong[1]) / 60) + Number(arrLong[2]) / 3600
      }
      
      if (lat) objItem.latitude = lat
      if (long) objItem.longitude = long

      array3.push(objItem)
    })
    
    const results = { ...values, coordinates: array3, coordinatesList:coordinatesList }

    editSpecie(user.token, slug, results).then(res => {
      console.log(res.data);
      window.alert('Thành công!')
      history.push('/admin/dashboard')
    }).catch(err => {
      console.log(err);
      toast.error(err.response.data.err)
    })
  }

  const handleChange = e => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value);
  }

  const handleFamiliaChange = e => {
    e.preventDefault()
    console.log('Click familia', e.target.value);
    setValues({ ...values, familia: e.target.value })
    getFamiliaListGenus(e.target.value).then(res => {
      console.log('genus list of familia', res.data);
      setGenusOptions(res.data)
    })
    setShowGenus(true)
  }

  const handleOrdoChange = e => {
    e.preventDefault()
    console.log('Click ordo', e.target.value);
    setValues({ ...values, ordo: e.target.value })
    getOrdoListFamilia(e.target.value).then(res => {
      console.log('genus familia of ordo', res.data);
      setFamiliaOptions(res.data)
      getFamiliaListGenus(res.data[0]._id).then(g => {
        console.log('genus', g.data);
        setGenusOptions(g.data)
      })
    })
    setShowFamilia(true)
  }

  const handleSynonymsChange = e => {
    e.preventDefault()
    setValues({ ...values, synonymsList: e.target.value, synonyms: e.target.value.split(';') })

    console.log(e.target.name, e.target.value);
  }

  const handleRowChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...coordinatesList];
    list[index][name] = value;
    setCoordinatesList(list);
  };

  const handleRowRemoveClick = index => {
    const list = [...coordinatesList];
    list.splice(index, 1);
    setCoordinatesList(list);
  };

  const handleRowAddClick = () => {
    setCoordinatesList([...coordinatesList, { latitude: "", longitude: "" }]);
  };

  return (
    <div className="container-fluid bg-main" style={{ marginTop: '200px' }}>
      <div className="row bg-child">
        <div className="col-md-1 col__ml--2 l-0">
          <Nav />
        </div>
        <div className="l-12 nav-admin__child">
          <ul >
            <li>
              <Link to="/admin/dashboard">{t('dashboard')}</Link>
            </li>

            <li>
              <Link to="/admin/ordo">{t('ordo')}</Link>
            </li>
            <li>
              <Link to="/admin/familia">{t('familia')}</Link>
            </li>
            <li>
              <Link to="/admin/genus">{t('genus')}</Link>
            </li>
            <li>
              <Link to="/admin/specie">{t('specie')}</Link>
            </li>

          </ul>
        </div>

        <div className='col-md-11'>
          <br />
          {loading ? <LoadingOutlined className='text-danger' /> : <h4 style={{ textAlign: 'center' }}>{t('editSpecie')}</h4>}
          <hr />

          <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageBackground')}
                setLoading={setLoading}
                children={`imagesBackground`}
              />
            </div>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageFlower')}
                children={`imagesFlower`}
                setLoading={setLoading}
              />
            </div>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageLeave')}
                setLoading={setLoading}
                children={`imagesLeave`}

              />
            </div>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageFruit')}
                children={`imagesFruit`}
                setLoading={setLoading}

              />
            </div>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageSeed')}
                children={`imagesSeed`}
                setLoading={setLoading}

              />
            </div>
            <div className="col-md-4 l-6">
              <FileUploadLocal
                values={values}
                setValues={setValues}
                name={t('chooseImageClove')}
                setLoading={setLoading}
                children={`imagesClove`}

              />
            </div>
          </div>



          <SpecieEditForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleOrdoChange={handleOrdoChange}
            handleFamiliaChange={handleFamiliaChange}
            showGenus={showGenus}
            showFamilia={showFamilia}
            genusOptions={genusOptions}
            familiaOptions={familiaOptions}
            handleSynonymsChange={handleSynonymsChange}
            index={i}
            ordoList={ordoList}
            handleRowChange={handleRowChange}
            handleRowRemoveClick={handleRowRemoveClick}
            handleRowAddClick={handleRowAddClick}
            coordinates = {coordinatesList}
          />

        </div>
      </div>
    </div>
  )
}

export default SpecieEdit