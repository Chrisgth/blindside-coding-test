import axios from 'axios';

export const getVideos = async (config) => {
  const response = await axios.get(`https://api.vimeo.com/videos`, config);
  return response;
};
