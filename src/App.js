import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'
import { getPlacesData } from './api'

function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({})
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(' ');

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
console.log(filteredPlaces.length)
  }, [rating])

  useEffect(() => {
    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data);
      })
  }, [type, bounds, coordinates]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}} >
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
      </Grid>
      <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
