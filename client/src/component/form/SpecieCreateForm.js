import React from 'react'
import { createSpecie } from '../../api/specie'

const SpecieCreateForm = ({handleChange,handleSubmit,values,handleFamiliaChange,showGenus,genusOptions,handleOrdoChange,familiaOptions,showFamilia,handleSynonymsChange, handleCoordinatesChange }) => {

  const {
    name,
    vnName,
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
    source,
    fruitSeason} = values


  return (
    <form onSubmit = {handleSubmit} style ={{background:'none'}}>
      <div className="form-group">
        <label>Tên loài</label>
        <input 
          type="text" 
          name ='name' 
          className = 'form-control' 
          value ={name} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>Tên bộ</label>
        <select 
          type="text" 
          name ='ordo' 
          className = 'form-control' 
          onChange  = {handleOrdoChange}
        >
          <option>Chọn bộ</option>
          {ordoList.length > 0 && ordoList.map(o => 
             (<option key ={o._id} value={o._id}>{o.name}</option>)
          )}
        </select>
      </div>

      { showFamilia &&
      <div className="form-group">
        <label>Tên họ</label>
        <select 
          type="text" 
          name ='familia' 
          className = 'form-control' 
          onChange  = {handleFamiliaChange}
        >
          <option>Chọn họ</option>
          {familiaOptions.length > 0 && familiaOptions.map(f => 
             (<option key ={f._id} value={f._id}>{f.name}</option>)
          )}
        </select>
      </div>
      
      }

      {showGenus &&
        <div className="form-group">
        <label>Tên chi</label>
        <select 
          type="text" 
          name ='genus' 
          className = 'form-control' 
          onChange  = {handleChange}
        >
          <option>Chọn chi</option>
          {genusOptions.length > 0 && genusOptions.map(g => 
             (<option key ={g._id} value={g._id}>{g.name}</option>)
          )}
        </select>
      </div>
      }

      <div className="form-group">
        <label>Tên tiếng Việt</label>
        <input 
          type="text" 
          name ='vnName' 
          className = 'form-control' 
          value ={vnName} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <input 
          type="text" 
          name ='description' 
          className = 'form-control' 
          value ={description} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giá tri sử dụng</label>
        <input 
          type="text" 
          name ='value' 
          className = 'form-control' 
          value ={value} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>Phân bố</label>
        <input 
          type="text" 
          name ='distribution' 
          className = 'form-control' 
          value ={distribution} 
          onChange  = {handleChange}
        />
      </div>

      <div className="form-group">
        <label>Tên đồng nghĩa</label>
        <input 
          type="text" 
          name ='synonymsList' 
          className = 'form-control' 
          value ={synonymsList} 
          onChange  = {handleSynonymsChange}
        />
      </div>

      <div className="form-group">
        <label>Tọa độ</label>
        <input 
          type="text" 
          name ='coordinatesList' 
          className = 'form-control' 
          value ={coordinatesList} 
          onChange  = {handleCoordinatesChange}
        />
      </div>

      <div className="form-group">
        <label>Nguồn tin</label>
        <input 
          type="text" 
          name ='source' 
          className = 'form-control' 
          value ={source} 
          onChange  = {handleChange}
        />
      </div>
      <button className="btn btn-outline-info" onClick = {handleSubmit}>
        Hoàn thành
      </button>
    </form>
  )
}

export default SpecieCreateForm
