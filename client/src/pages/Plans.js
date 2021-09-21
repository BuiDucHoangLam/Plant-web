import React, { useEffect, useState } from 'react'
import {getPlants} from '../api/plant'
import CardPlant from '../component/CardPlant'

const Plans = () => {
  const [plan,getPlan] = useState([])
  useEffect(()=>{
    getPlants().then(res => {
      getPlan(res.data)
    }).catch(err => console.log(err))
  },[])
  return (
    <div className ='container' style ={{marginTop:'196px'}}>
 
        {plan.length 
        ? 
          <div className ='col-md-4'><CardPlant plant ={plan}/> </div> 
         
           : <div>none</div>}
    
    </div>
  )
}

export default Plans
