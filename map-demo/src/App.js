import React, {useState, useEffect} from "react";
import {getPlacesData} from './api/index.js';
import {CssBaseline, Grid} from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

export default function App() {
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [places,setPlaces]= useState([]);
    const [coordinates, setCoordinates] = useState({ });
    const [bounds, setBounds] = useState({});
    const [isLoading, setIsLoading] = useState(false); 
    const [type, setType] = useState();
    const [rating, setRating] = useState(' '); 

    useEffect(()=>{
      const filteredPlaces = places.filter((place)=> places.rating > rating );
      setFilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat: latitude, lng: longitude});
    })
    },[]);

    useEffect(()=>{
        setIsLoading(true);
      //console.log(coordinates, bounds);
    getPlacesData(type, bounds.sw, bounds.ne).then((data)=>{
      // console.log(data);
      setPlaces(data);
      setFilteredPlaces([])
      setIsLoading(false);
    });
    },[type, coordinates, bounds])

  return (
    <div >

      <CssBaseline/>
      {/* <Header setCoordinates={setCoordinates}/> */}
      <Grid container spacing ={3} style={{width: '100%'}}>
        
        <Grid item xs={12} md={4}>
          <List places={ filteredPlaces.length ? filteredPlaces: places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating = {rating} 
          setRating = {setRating} />
        </Grid>
        
        <Grid item xs={15} md={8}>
          <Map setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces: places}
              setChildClicked={setChildClicked}/>
        </Grid>
     </Grid>
    </div>
  );
}
