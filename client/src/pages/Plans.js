import React, { useEffect, useState } from 'react'

const initialState = {
  
} 

const Plans = () => {
  const [name,setName] = useState('')
  const [not,setNot] = useState('')
  const [values,setValues] = useState(initialState)
  let arr = []
  let array = []
  console.log(values);

  return (
    <div className ='container' style ={{marginTop:'196px'}}>
      <input 
        type="text" 
        value ={name} 
        onChange ={e => {
          setName(e.target.value)
          arr.push(e.target.value)
          setValues({...values,...values.images,back:arr})
        }}
      />
      <input 
        type="text" 
        value ={not} 
        onChange ={e => {
          setNot(e.target.value)
          array.push(e.target.value)
          setValues({...values,...values.images,front:array})
        }}
      />
      {/* <input type="text" value ={plan.values} onChange ={e => setPlan({...values,...images,leave:})}/> */}
      {JSON.stringify(name)}
      {JSON.stringify(not)}
      {JSON.stringify(values)}

    </div>
  )
}

export default Plans
