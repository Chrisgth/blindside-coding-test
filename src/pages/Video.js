import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRelated } from "../services/getRelated";
import { getVideo } from "../services/getVideo";
import Parser from "html-react-parser";

const Video = ({ setNavSearch }) => {
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
    }
  };
  useEffect(() => {
    displayVideo();
    setNavSearch(true);
  }, []);
  return (
    <div className="video">
      {video && (
        <div className="videoContent">
          <div className="videoPlayer">{Parser(video.data.embed.html)}</div>
          <div className="title">
            <h3>{video.data.name}</h3>
          </div>
          <div className="videoRelated">
            <div className="related">
              <h3>Related</h3>
              {relatedVideos && (
                <div className="relatedVideos">
                  {relatedVideos.data.data.map((video) => (
                    <Link to={video.uri} className="videoLink">
                      <div className="relatedVideoWrapper">
                        <img src={video.pictures.sizes[1].link} alt="" />
                        <p>{video.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="comments">
              <h3>Comments</h3>
              <div className="addComment">
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                ></textarea>
                <button className="smallButton">Add Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
<div className="video">Singular video</div>;
