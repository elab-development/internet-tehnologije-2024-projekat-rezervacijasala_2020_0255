import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://calendars.p.rapidapi.com/ical_fetch',
  params: {
    json: 'true',
    c: 'brooklynsteel',
  },
  headers: {
    'x-rapidapi-key': 'dd42923d0dmsh489e6800d74315cp1dba66jsn6967fe78215c',
    'x-rapidapi-host': 'calendars.p.rapidapi.com',
  },
};

export const getEvents = async () => {
  try {
    const response = await axios.request(options);
    return response.data.events;
  } catch (error) {
    console.error(error);
  }
};
