import React from 'react'
import { useDispatch } from 'react-redux'
import { Card,Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import plant1 from '../images/plant1.jpg'
const {Meta} = Card

const CardPlant = ({plant}) => {
  // const {images,slug,name,genus,description} = p
  const dispatch = useDispatch()

  return (
    
    <div >
      {plant.map(p=>
        <Link to ={`/details-specie/${p.slug}`}>
        <Card
          cover={
            <img 
              alt={p.images && p.images.length && p.images[0].public_id}
              src={p.images && p.images.length && p.images[0].url}
              style ={{height:'200px',objectFit:'contain'}}
              className='p-1'
            />
          }
         
        >
          <Meta
            title ={`${p.name} - $${p.genus}`}
            description={`${p.description && p.description.substring(0,40)}...`}
          />
        
        </Card>
      </Link>)}
    </div>
  )
}

export default CardPlant

