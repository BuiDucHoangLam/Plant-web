import React from 'react'
import {Card} from 'antd'
import { Link } from 'react-router-dom'

const {Meta} = Card

const PlantCard = ({specie}) => {
  const {name,vnName,description,slug,type} = specie
  
  return (
    <Card
      cover ={
        <Link to = {type === 'specie' ? `/details-specie/${slug}` :  `/details-${type}/${slug}`} style ={{display:'flex',justifyContent:'center'}}>
          {specie.images && <img src = {Object.values(specie.images).flat().length && `${process.env.REACT_APP_LOCAL}${Object.values(specie.images).flat()[0].url}`} alt ='img' style ={{height:'150px',objectFit:'cover'}} className ='m-2'/>}
        </Link>
      }
      
    >
      <div style ={{
        overflow: 'hidden',
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 500,
        fontSize: '15px',
        fontStyle:'italic',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginBottom:'8px'
      }}>{name}</div>
      <div style ={{height:'12vh'}}>
        <Meta 
          title = {vnName}
          description = {`${description && description.substring(0,60)}...`}
        />
      </div>
    </Card>
  )
}

export default PlantCard
