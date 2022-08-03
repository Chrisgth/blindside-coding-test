import axios from 'axios';

export const getRelated = async (config, id, page) => {
  const response = await axios.get(
    `https://api.vimeo.com/videos/${id}/videos?filter=related&page=${page}`,
    config,
  );
  return response;
};
