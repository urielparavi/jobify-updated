import axios from 'axios';

// create => This is going to create the custome instance. So, just like we use axios to set up the requests, we can
// now use the custom fetch, but in that create, we'll pass in some additional things and they will be added by default
const customFetch = axios.create({
  baseURL: '/api/v1',
});

export default customFetch;
