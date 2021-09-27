import React from 'react'
import Map from './Map'


const GoogleMap = ({coordinates}) => {
  const key = 'AIzaSyDIc3u_Pdmfhxb7Ti-3riE6IoCRHbPxeEM'
  console.log(coordinates);

  const center = {
    lat: 59.95,
    lng: 30.33
  }

  return (
    <Map 
      coordinates = {coordinates}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default GoogleMap
