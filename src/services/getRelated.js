import axios from "axios";

export const getRelated = async (config, id) => {
  const response = await axios.get(
    `https://api.vimeo.com/videos/${id}/videos?filter=related`,
    config
  );
  return response;
};
