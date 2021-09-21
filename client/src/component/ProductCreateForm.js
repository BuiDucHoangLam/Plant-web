import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({handleSubmit,handleChange,values}) => {
  
  // restructure
  const {
    name,
    description,
    distribution,
    family,
    genus,
    synonyms,
    // shipping,
    otherData,
    // images,
    bibliography,
    source,
    relatives,
    // color,
    // brand,
  } = values

  return (
    <form onSubmit={handleSubmit} style ={{background:"none"}}>
            <div className="form-group">
              <label>Tên</label>
              <input 
                type="text" 
                name='name' 
                className='form-control' 
                value= {name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Họ</label>
              <input 
                type="text" 
                name='family' 
                className='form-control' 
                value= {family}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Loài</label>
              <input 
                type="text" 
                name='genus' 
                className='form-control' 
                value= {genus}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Miêu tả</label>
              <input 
                type="text" 
                name='description' 
                className='form-control' 
                value= {description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phân bổ</label>
              <input 
                type="text" 
                name='distribution' 
                className='form-control' 
                value= {distribution}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Tên khác</label>
              <input 
                type="text" 
                name='synonyms' 
                className='form-control' 
                value= {synonyms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Thông tin khác</label>
              <input 
                type="text" 
                name='otherData' 
                className='form-control' 
                value= {otherData}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Lược sử</label>
              <input 
                type="text" 
                name='bibliography' 
                className='form-control' 
                value= {bibliography}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Nguồn tin</label>
              <input 
                type="text" 
                name='source' 
                className='form-control' 
                value= {source}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Họ hàng</label>
              <input 
                type="text" 
                name='relatives' 
                className='form-control' 
                value= {relatives}
                onChange={handleChange}
              />
            </div>
              <br />
            <button className="btn btn-outline-otherData">
              Save
            </button>
          </form>
  )
}

export default ProductCreateForm
