import React from 'react'
import {Card} from 'antd'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const {Meta} = Card

const SpecieCard = ({specie,handleRemove}) => {
  const {name,vnName,description,images,slug} = specie
  return (
    <Card
      cover ={
        <Link to = {`/details/${slug}`}>
           <img src = {images.length && images[0].url} alt ='img' style ={{height:'150px',objectFit:'cover'}} className ='m-2'/>
        </Link>
      }
      actions ={[
        <EditOutlined className ='text-warning'/>,
        <DeleteOutlined className ='text-danger' onClick ={() => handleRemove(slug)} />
      ]}
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
      <Meta 
        title = {vnName}
        description = {`${description && description.substring(0,60)}...`}
        
      />
    </Card>
  )
}

export default SpecieCard