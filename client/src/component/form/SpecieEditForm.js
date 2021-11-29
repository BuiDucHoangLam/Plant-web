import React from 'react'
import { useTranslation } from "react-i18next";

const SpecieEditForm = ({handleChange,handleSubmit,values,handleFamiliaChange,
  showGenus,genusOptions,handleOrdoChange,familiaOptions,showFamilia,
  handleSynonymsChange, handleCoordinatesChange, ordoList,handleAddCoord }) => {
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
    familia,
    genus,
    synonyms,
    description,
    value,
    longitudeList,
    latitudeList,
    distribution,
    coordinates,
    source,
     } = values

  

  return (
    <form className ="form__mobile" onSubmit = {handleSubmit} style ={{background:'none'}}>
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
          value ={ordo}
          onChange  = {handleOrdoChange}
        >
          
          {ordoList.length > 0 && ordoList.map(o => {
            if(o._id === ordo)
              <option key ={o._id} value={o._id}>{o.name}</option>
            return <option key ={o._id} value={o._id}>{o.name}</option>
          })}
        </select>
      </div>

     
      <div className="form-group">
        <label>{t('familia')}</label>
        <select 
          type="text" 
          name ='familia' 
          className = 'form-control' 
          value ={familia}
          onChange  = {handleFamiliaChange}
        >
        
          {familiaOptions.length > 0 && familiaOptions.map(f => {
            if(f._id === familia)
            (<option key ={f._id} value={f._id}>{f.name}</option>)
            return (<option key ={f._id} value={f._id}>{f.name}</option>)
          })}
        </select>
      </div>
      
      

  
        <div className="form-group">
        <label>{t('genus')}</label>
        <select 
          type="text" 
          name ='genus' 
          values = {genus}
          className = 'form-control' 
          onChange  = {handleChange}
        >
          
          {genusOptions.length > 0 && genusOptions.map(g => {
            if(g._id === genus)
            (<option key ={g._id} value={g._id}>{g.name}</option>)
            return (<option key ={g._id} value={g._id}>{g.name}</option>)
          })}
        </select>
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

      {coordinates && <div id ='coordField'>
        <div className="form-group coord-form">
          <div style ={{textAlign:'center'}}>{t('coordinate')}</div>
            <div className="row">
                <div style ={{textAlign:'center'}} className="col-md-6 l-6">
                  <label>{t('longitude')}</label>
                </div>
                <div style ={{textAlign:'center'}} className="col-md-6 l-6">
                  <label>{t('latitude')}</label>
                </div>
            </div>
            <div className="row">
              <div className="col-md-6 l-6">
               {longitudeList && longitudeList.map(l => (
                 <input 
                  type="text" 
                  name = 'longitudeList'
                  className = 'form-control' 
                  defaultValue = {l.join(' ')}
                  onChange = {e => e.target.value}
                  key = {Math.random()}
                  
                />
               ))}
              </div>
              <div className="col-md-6 l-6">
                {latitudeList &&
                  latitudeList.map(l => (
                    <input 
                      type="text" 
                      name = 'latitudeList'
                      className = 'form-control' 
                      onChange = {e => e.target.value}
                      key = {Math.random()}
                      defaultValue = {l.join(' ')}
                    /> 
                  ))
                } 
              </div>
            </div>
          <div className="btn btn-outline-info" id ='addCoord' onClick ={handleAddCoord} > + </div> <span style ={{width:'10%'}}></span>
        </div> 
      </div>}

      <div className="row">
        <div className="col-md-6">
          <div style ={{textAlign:'center'}}>{t('vietnam')}</div>
            <div className="form-group">
            <label>{t('name')}</label>
              <input 
                type="text" 
                name ='vnName' 
                className = 'form-control' 
                value ={vnName} 
                onChange  = {handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t('description')}</label>
              <textarea 
                type="text" 
                name ='description' 
                className = 'form-control' 
                value ={description} 
                onChange  = {handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t('useValue')}</label>
              <textarea 
                type="text" 
                name ='value' 
                className = 'form-control' 
                value ={value} 
                onChange  = {handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t('distribution')}</label>
              <textarea 
                type="text" 
                name ='distribution' 
                className = 'form-control' 
                value ={distribution} 
                onChange  = {handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t('source')}</label>
              <textarea 
                type="text" 
                name ='source' 
                className = 'form-control' 
                value ={source} 
                onChange  = {handleChange}
              />
            </div>
        </div>

        <div className="col-md-6">
        <div style ={{textAlign:'center'}}>{t('english')} </div>
         
          <div className="form-group">
            <label> </label>
            <label className ='show-title__child'>{t('name')}</label>
            
            <input 
              style = {{marginTop:'8px'}}
              type="text" 
              name ='enName' 
              className = 'form-control' 
              value ={enName} 
              onChange  = {handleChange}
            />
         
      </div>

      <div className="form-group">
        <label> </label>
        <label className ='show-title__child'>{t('description')}</label>
        <textarea 
              style = {{marginTop:'8px'}}
              type="text" 
          name ='enDescription' 
          className = 'form-control' 
          value ={enDescription} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">     
          
            <label> </label>
            <label className ='show-title__child'>{t('useValue')}</label>
            <textarea 
              style = {{marginTop:'8px'}}
              type="text" 
              name ='enValue' 
              className = 'form-control' 
              value ={enValue} 
              onChange  = {handleChange}
            />
          
      </div>

      <div className="form-group">
       
            <label> </label>
            <label className ='show-title__child'>{t('distribution')}</label>
            <textarea 
              style = {{marginTop:'8px'}}
              type="text" 
              name ='enDistribution' 
              className = 'form-control' 
              value ={enDistribution} 
              onChange  = {handleChange}
            />
         
      </div>
     
     <div className="form-group">
     
            <label> </label>
            <label className ='show-title__child'>{t('source')}</label>
            <textarea 
              style = {{marginTop:'8px'}}
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