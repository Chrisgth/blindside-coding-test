import axios from 'axios';

export const getVideo = async (config, id) => {
  const response = await axios.get(`https://api.vimeo.com/videos/${id}`, config);
  return response;
};
