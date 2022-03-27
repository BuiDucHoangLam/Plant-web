import React from 'react'
import Map from './Map'


const GoogleMap = ({coordinates,zoom,varClick,onMapClick,markers,selected,setSelected}) => {
  const key = 'AIzaSyDIc3u_Pdmfhxb7Ti-3riE6IoCRHbPxeEM'

  return (
    <Map 
      coordinates = {coordinates}
      zoom = {zoom}
      varClick = {varClick}
      onMapClick = {onMapClick}
      markers = {markers}
      selected = {selected}
      setSelected = {setSelected}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default GoogleMap
