
import axios from 'axios';

export const getRestaurants = async () => {
  const restaurantOptions = {
    method: 'GET',
    url: `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=294472&page=1`,
    headers: {
      'x-rapidapi-key': 'f528eeebe0msh20da61e06a08659p10913bjsn9f9adb58783f',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(restaurantOptions);
    console.log(response.data.data.data);
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
};
