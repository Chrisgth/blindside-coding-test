import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRelated } from "../services/getRelated";
import { getVideo } from "../services/getVideo";

const Video = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const id = useParams();
  console.log(id.id);
  const displayVideo = async () => {
    if (id.id === "") {
      return;
    } else {
      const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_APP_KEY}` },
      };
      const searchResult = await getVideo(config, id.id);
      const relatedResult = await getRelated(config, id.id);
      setVideo(searchResult);
      setRelatedVideos(relatedResult);
      console.log(searchResult);
      console.log(relatedResult);
    }
  };
  useEffect(() => {
    displayVideo();
  }, []);
  return <div className="video">Singular video</div>;
};

export default Video;
<div className="video">Singular video</div>;
