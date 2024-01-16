import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Player } from "video-react";

const FileViewers = (props) => {
     let { src, type, poster } = props;
  useEffect(() => {
   
  }, []);

  return (
    <>
      {type === "เอกสาร" && (
        <Image
          style={{ width: "50%", padding: "12px" }}
          src="google-docs.png"
        />
      )}

      {type === "รูปภาพ" && (
        <Image
          className="img-infor"
          style={{ width: "100%", height: "auto", objectFit: "fill" }}
          src={`${import.meta.env.VITE_BASE_URL}/${src}`}
        />
      )}

      {type === "วิดิโอ" && (
        <Player
          playsInline
          poster={`${import.meta.env.VITE_BASE_URL}/${poster}`}
          src={`${import.meta.env.VITE_BASE_URL}/${src}`}
        />
      )}
    </>
  );
};

export default FileViewers;
