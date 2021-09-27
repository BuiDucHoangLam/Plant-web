import React from 'react'

const OrdoForm = ({onSubmit,name,functionality,change}) => {
  return (
    <form style ={{background:'none'}} onSubmit={onSubmit}>
    <input 
      name='name'
      type='text' 
      className='form-control' 
      value={name} 
      onChange={e=>change(e.target.value)}
      placeholder="Nhập tên"
      autoFocus
      required
    />
    <br/>
    <button onClick ={onSubmit} type="submit" className="btn btn-raised">
      {functionality}
    </button>
  </form>
  )
}

export default OrdoForm
