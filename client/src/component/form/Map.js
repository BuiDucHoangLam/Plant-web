import React,{useState,useCallback} from 'react'
import { withGoogleMap, withScriptjs, GoogleMap,Marker,InfoWindow } from "react-google-maps"
import {} from '../../icon/flower-pot.png'
import {formatRelative} from 'date-fns'

const Map =  ({coordinates,zoom,varClick = null,onMapClick,markers,selected,setSelected}) => {

  // },[])
  const center = {
    lat: 11.936230,
    lng: 108.445259
  }

  return (
    <div>
      <GoogleMap
          defaultZoom={zoom ? zoom : 6}
          defaultCenter={coordinates && coordinates.length > 0 ? {lat: coordinates[0][0] , lng: coordinates[0][1]} : center}
          onClick = {varClick && onMapClick}
        >
          {coordinates.map((coord,index) => {
            return <Marker
              key ={index}
              position={{ lat: coord[0] , lng: coord[1] }}
            
          />
          }) }

      

{/* 
          {(markers && markers.length > 0) && markers.map((marker,index) => (
            <Marker 
              key = {index} 
              position = {{lat:marker.lat,lng:marker.lng}} 
              onClick = {() => setSelected(marker)}
            />))}

              {selected ? <InfoWindow 
                position = {{lat:selected.lat,lng:selected.lng}}
                onCloseClick = {() => {
                  setSelected(null)
                }}
              >
                <div>
                  <h2>Keykul spotted!</h2>
             
                </div>
              </InfoWindow>
            : null  
          } */}
          
      </GoogleMap>
      
    
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));