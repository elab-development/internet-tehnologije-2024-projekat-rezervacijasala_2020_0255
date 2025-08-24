import axios from 'axios';

export const getRestaurants = async () => {
  const restaurantOptions = {
    method: 'GET',
    url: `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=294472&page=1`,
    headers: {
      'X-RapidAPI-Key': 'dd42923d0dmsh489e6800d74315cp1dba66jsn6967fe78215c',
      'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(restaurantOptions);
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};