import axios from "axios";
export const getPlacesData = async (type, sw, ne) =>{
    try {
    const {data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
     params: {
      bl_latitude: sw.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      tr_latitude: ne.lat,
         },
      
        headers: {
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          'X-RapidAPI-Key': 'b352e4a778mshb7233be1d5486d2p1dfcb8jsnbe87ddde5d40'
        }
      });
    return data;
    }
    catch(error)
{
console.log(error)
    }
}