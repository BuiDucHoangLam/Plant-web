import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap,Marker } from "react-google-maps"
import {} from '../../icon/flower-pot.png'
const Map =  ({coordinates,zoom}) => {
  
  return (
    <div>
      <GoogleMap
          defaultZoom={zoom ? zoom : 5}
          defaultCenter={{ lat: coordinates[0][0] , lng: coordinates[0][1]  }}
        >
          {coordinates.map((coord,index) => {
            return <Marker
              key ={index}
              icon={{
                url: 'https://res.cloudinary.com/dabmpjvx2/image/upload/v1632713780/flower-pot_eeu0mh.png',
                scaledSize: new window.google.maps.Size(15, 15),
              }}
              // icon={{
              //   url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
              //   scaledSize: new window.google.maps.Size(15, 15),
              // }}
              position={{ lat: coord[0] , lng: coord[1] }}
          />
          }) }
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));