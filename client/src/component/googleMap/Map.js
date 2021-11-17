import React, { useCallback, useRef, useState } from 'react'
import {GoogleMap,useLoadScript,Marker,InfoWindow} from '@react-google-maps/api'
import {formatRelative} from 'date-fns'
import mapStyles from './mapStyles'
import usePlacesAutoComplete,{getGeocode,getLatLng} from 'use-places-autocomplete'
import {Combobox,ComboboxInput,ComboboxList,ComboboxOption,ComboboxPopover} from '@reach/combobox'
import '@reach/combobox/styles.css'

const key = 'AIzaSyDIc3u_Pdmfhxb7Ti-3riE6IoCRHbPxeEM'
const libraries = ['places']

const mapContainerStyle = {
  width:'100vw',
  height:'100vh',
}
const center = {
  lat:11.936230,
  lng:108.445259
}
const options = {
  styles:mapStyles,
  disableDefaultUI:true,
}

const Search = ({panTo}) => {
  const {ready,value,suggestions:{status,data},setValue,clearSuggestions} = usePlacesAutoComplete({
    requestOptions:{
      location:{lat:()=>11.936230,lng:()=>108.445259},
      radius: 200 * 1000
    }
  })

  return (
    <div style ={{
        position: 'absolute',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '400px',
        zIndex: '10'
      }}
    >
      <Combobox onSelect = {async (address) => {
          try {
            const results = await getGeocode({address})
            const {lat,lng} = await getLatLng(results[0])
            panTo({lat,lng})
            console.log(lat,lng);
            console.log(results[0]);
          } catch (error) {
            console.log('error',error);
          }
        }}
      >
        <ComboboxInput 
          style = {{
            padding: '0.5rem',
            fontSize: '1.5rem',
            width: '100%',
          }}
          value = {value} 
          onChange = {(e) => {
              setValue(e.target.value)

            }} 
          disabled = {!ready}
          placeholder = 'Enter an address'
          />
          <ComboboxPopover>
            {status === 'OK' && data.map((id,description) => (
              <ComboboxOption
                key = {id}
                value  = {description}
              />

            ))}
          </ComboboxPopover>
      </Combobox>
    </div>
  )

}

const Map = () => {
  const [markers,setMarkers] = useState([])
  const [selected,setSelected] = useState(null)

  const onMapClick = useCallback((e) => {
          
    setMarkers(current => [...current,{
      lat:e.latLng.lat(),
      lng:e.latLng.lng(),
      time: new Date()
    }])
  },[])

  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey:key,
    libraries
  })

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  },[])

  const panTo = useCallback(({lat,lng}) => {
    mapRef.current.panTo({lat,lng})
    mapRef.current.setZoom(14)
  },[])

  if(loadError) return 'Err'
  if(!isLoaded) return 'loading map'

  return (
    <div>
      <h1
        style ={{
          position:'absolute',
          top:'1rem',
          left:'1rem',
          color:'white',
          zIndex:'10',
          margin:0,
          padding:0
        }}
      >Keykul</h1>
      <Search 
        panTo = {panTo}
      />
      <GoogleMap 
        mapContainerStyle ={mapContainerStyle} 
        zoom = {8} 
        center = {center}
        options = {options}
        onClick = {onMapClick}
        onLoad = {onMapLoad}
      >
        {markers.map(marker => (
        <Marker 
          key = {marker.time.toISOString()} 
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
              <p>Spotted {formatRelative(selected.time,new Date())}</p>
            </div>
          </InfoWindow>
        : null  
        }
      </GoogleMap>
    </div>
  )
}

export default Map
