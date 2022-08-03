import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRelated } from "../services/getRelated";
import { getVideo } from "../services/getVideo";
import Parser from "html-react-parser";
import LoadingSpinner from "../components/Spinner";

const Video = ({ setNavSearch, user }) => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const linkParams = useParams();
  const { id } = linkParams;
  const displayVideo = async () => {
    if (id === "") {
      return;
    } else {
      setVideoLoading(true);
      setVideo();
      setRelatedVideos();
      const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_APP_KEY}` },
      };
      const searchResult = await getVideo(config, id);
      const relatedResult = await getRelated(config, id);
      console.log(searchResult);
      setVideo(searchResult);
      setRelatedVideos(relatedResult);
      setVideoLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    if (e.target.value.length > 500) return;
    setText(e.target.value);
  };

  const commentToggle = () => {
    showComments === true ? setShowComments(false) : setShowComments(true);
  };

  const onClickHandler = () => {
    if (text === "") return;
    const newComments = [...comments];
    let comment = {
      message: text,
      username: user.nickname,
      picture: user.picture,
    };
    newComments.push(comment);
    setComments(newComments);
    setText("");
  };

  useEffect(() => {
    displayVideo();
    setComments([]);
    setText("");
  }, [id]);
  useEffect(() => {
    setNavSearch(true);
    console.log("generaluseeffect");
  }, []);
  return (
    <div className="video">
      {videoLoading && <LoadingSpinner />}
      {video && (
        <div className="videoContent">
          <div className="videoPlayer">
            {video.data.embed.html ? (
              Parser(video.data.embed.html)
            ) : (
              <p>Embed not found.</p>
            )}
          </div>
          <div className="title">
            <h3>{video.data.name}</h3>
          </div>
          <div className="videoRelated">
            <div className="related">
              <h3>Related</h3>
              {relatedVideos && (
                <div className="relatedVideos">
                  {relatedVideos.data.total === 0 && (
                    <p>No related videos have been found.</p>
                  )}
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
            <button className="smallButton" onClick={commentToggle}>
              Toggle comments
            </button>
            {showComments === true && (
              <div className="comments">
                <h3>Comments</h3>
                <div className="addComment">
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="5"
                    value={text}
                    onChange={(e) => onChangeHandler(e)}
                  ></textarea>
                  <button className="smallButton" onClick={onClickHandler}>
                    Add Comment
                  </button>
                </div>
                <div className="allComments">
                  {comments.map((comment) => (
                    <div className="comment">
                      <img src={comment.picture} alt="profile" />
                      <h4>{comment.username}</h4>
                      <p>{comment.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
<div className="video">Singular video</div>;
