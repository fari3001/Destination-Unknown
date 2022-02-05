import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@material-ui/core';
import useStyles from './styles'

const Map = ({ setCoordinates, setBounds, coordinates, places }) =>  {
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)')

    
  return (
      <div className={classes.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCDMIUQUZLfX3IK9Ka7FIYJ-pYv0I0Y4HY' }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={12}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
              console.log(e)
              setCoordinates({ lat: e.center.lat, lng: e.center.lng })
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
            onChildClick={''}
          >
            {places?.map(() => (
              <div
              className={classes.markerContainer}
              lat={place.lat}
              >


              </div>
            ))}
          </GoogleMapReact>
      </div>
  )
}

export default Map
