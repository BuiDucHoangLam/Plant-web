import React from 'react'
import { createSpecie } from '../../api/specie'
import { useTranslation } from "react-i18next";

const SpecieEditForm = ({handleChange,handleSubmit,values,handleFamiliaChange,showGenus,genusOptions,handleOrdoChange,familiaOptions,showFamilia,handleSynonymsChange, handleCoordinatesChange, handleLongitudeChange, handleLatitudeChange, index }) => {
  const {t} = useTranslation()

  const {
    name,
    vnName,
    enName,
    enDescription,
    enDistribution,
    enSource,
    enValue,
    ordo,
    ordoList,
    familia,
    familiaList,
    genus,
    genusList,
    synonyms,
    synonymsList,
    description,
    value,
    images,
    distribution,
    coordinates,
    coordinatesList,
    longitude,
    latitude,
    source,
     fruitSeason} = values

  

  return (
    <form onSubmit = {handleSubmit} style ={{background:'none'}}>
      <div className="form-group">
        <label>{t('specie')}</label>
        <input 
          type="text" 
          name ='name' 
          className = 'form-control' 
          value ={name} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>{t('ordo')}</label>
        <select 
          type="text" 
          name ='ordo' 
          className = 'form-control' 
          onChange  = {handleOrdoChange}
        >
          <option>{t('chooseOrdo')}</option>
          {ordoList.length > 0 && ordoList.map(o => 
             (<option key ={o._id} value={o._id}>{o.name}</option>)
          )}
        </select>
      </div>

      { showFamilia &&
      <div className="form-group">
        <label>{t('familia')}</label>
        <select 
          type="text" 
          name ='familia' 
          className = 'form-control' 
          onChange  = {handleFamiliaChange}
        >
          <option>{t('chooseFamilia')}</option>
          {familiaOptions.length > 0 && familiaOptions.map(f => 
             (<option key ={f._id} value={f._id}>{f.name}</option>)
          )}
        </select>
      </div>
      
      }

      {showGenus &&
        <div className="form-group">
        <label>{t('genus')}</label>
        <select 
          type="text" 
          name ='genus' 
          className = 'form-control' 
          onChange  = {handleChange}
        >
          <option>{t('chooseGenus')}</option>
          {genusOptions.length > 0 && genusOptions.map(g => 
             (<option key ={g._id} value={g._id}>{g.name}</option>)
          )}
        </select>
      </div>
      }

      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label>{t('vnName')}</label>
            <input 
              type="text" 
              name ='vnName' 
              className = 'form-control' 
              value ={vnName} 
              onChange  = {handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>{t('enName')}</label>
            <input 
              type="text" 
              name ='enName' 
              className = 'form-control' 
              value ={enName} 
              onChange  = {handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label>{t('description')}</label>
            <input 
              type="text" 
              name ='description' 
              className = 'form-control' 
              value ={description} 
              onChange  = {handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>{t('enDescription')}</label>
            <input 
              type="text" 
              name ='enDescription' 
              className = 'form-control' 
              value ={enDescription} 
              onChange  = {handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label>{t('useValue')}</label>
            <input 
              type="text" 
              name ='value' 
              className = 'form-control' 
              value ={value} 
              onChange  = {handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>{t('enUseValue')}</label>
            <input 
              type="text" 
              name ='enValue' 
              className = 'form-control' 
              value ={enValue} 
              onChange  = {handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label>{t('distribution')}</label>
            <input 
              type="text" 
              name ='distribution' 
              className = 'form-control' 
              value ={distribution} 
              onChange  = {handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>{t('enDistribution')}</label>
            <input 
              type="text" 
              name ='enDistribution' 
              className = 'form-control' 
              value ={enDistribution} 
              onChange  = {handleChange}
            />
          </div>
        </div>
      </div>

      {synonyms && <div className="form-group">
        <label>{t('synonyms')}</label>
        <input 
          type="text" 
          name ='synonymsList' 
          className = 'form-control' 
          value ={synonyms.join(';')} 
          onChange  = {handleSynonymsChange}
        />
      </div>}

       {coordinates && <div className="form-group coord-form">
        <label>{t('coordinate')}</label>
          <input 
            type="text" 
            name = 'coordinatesList'
            className = 'form-control' 
            value ={coordinates.map(i => i.join(' ')).join('\t')} 
            onChange  = {handleCoordinatesChange}
          />  
      </div>}

      <div className="form-group">
        <div className="row">
          <div className="col-md-6">
            <label>{t('source')}</label>
            <input 
              type="text" 
              name ='source' 
              className = 'form-control' 
              value ={source} 
              onChange  = {handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>{t('enSource')}</label>
            <input 
              type="text" 
              name ='enSource' 
              className = 'form-control' 
              value ={enSource} 
              onChange  = {handleChange}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-outline-info" onClick = {handleSubmit}>
      {t('complete')}
      </button>
    </form>
  )
}

export default SpecieEditForm
