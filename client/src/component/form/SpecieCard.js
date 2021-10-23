import React from 'react'
import {Card} from 'antd'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const {Meta} = Card

const SpecieCard = ({specie,handleRemove}) => {
  const {name,vnName,description,slug} = specie
  return (
    <Card
      cover ={
        <Link to = {`/details-specie/${slug}`} style ={{display:'flex',justifyContent:'center'}}>
          {specie.images && <img src = {Object.values(specie.images).flat().length && Object.values(specie.images).flat()[0].url} alt ='img' style ={{height:'150px',objectFit:'cover'}} className ='m-2'/>}
        </Link>
      }
      actions ={[
        <Link to ={`/admin/specie/${slug}`}> <EditOutlined className ='text-warning'/> </Link>,
        <DeleteOutlined style ={{marginTop:'19px'}} className ='text-danger' onClick ={() => handleRemove(slug)} />
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
