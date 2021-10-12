import React from 'react'
import { useTranslation } from "react-i18next";

const OrdoForm = ({onSubmit,values,functionality,change}) => {

  const {
    name,description,distribution,value,enDescription,enDistribution,enValue
  } = values

  const {t} = useTranslation()
  
  return (
    <form style ={{background:'none'}} onSubmit={onSubmit}>
      <div className="form-group">
        <label>{t('insertName')}</label>
        <input 
          name='name'
          type='text' 
          className='form-control' 
          value={name} 
          onChange={change}
          placeholder={t('insertName')}
          autoFocus
          required
        />
      </div>
      <div className="row">
        <div className="col-md-6">
        <div style ={{textAlign:'center'}}>{t('vietnam')} </div>
        
      <div className="form-group">
      
          <label>{t('description')}</label>
          <input 
            name='description'
            type='text' 
            className='form-control' 
            value={description} 
            onChange={change}
            placeholder={t('description')}
            autoFocus
            required
          />
         
      </div>
      <div className="form-group">
      
          <label>{t('distribution')}</label>
          <input 
            name='distribution'
            type='text' 
            className='form-control' 
            value={distribution} 
            onChange={change}
            placeholder={t('distribution')}
            autoFocus
            required
          />
          
      </div>
      <div className="form-group">
          <label>{t('useValue')}</label>
          <input 
            name='value'
            type='text' 
            className='form-control' 
            value={value} 
            onChange={change}
            placeholder={t('useValue')}
            autoFocus
            required
          />
      </div>
        </div>
        <div className="col-md-6">
        <div style ={{textAlign:'center'}}>{t('english')} </div>
        
      <div className="form-group">
            <label> </label>
          <input 
              style = {{marginTop:'8px'}}
            name='enDescription'
            type='text' 
            className='form-control' 
            value={enDescription} 
            onChange={change}
            placeholder={t('enDescription')}
            autoFocus
            required
          />
      </div>
      <div className="form-group">
            <label> </label>
          <input 
              style = {{marginTop:'8px'}}
            name='enDistribution'
            type='text' 
            className='form-control' 
            value={enDistribution} 
            onChange={change}
            placeholder={t('enDistribution')}
            autoFocus
            required
          />
      </div>
      <div className="form-group">
            <label> </label>
          <input 
              style = {{marginTop:'8px'}}
            name='enValue'
            type='text' 
            className='form-control' 
            value={enValue} 
            onChange={change}
            placeholder={t('enUseValue')}
            autoFocus
            required
          />
      </div>
        </div>
      </div>
      
    <br/>
    <button onClick ={onSubmit} type="submit" className="btn btn-raised">
      {functionality}
    </button>
  </form>
  )
}

export default OrdoForm
