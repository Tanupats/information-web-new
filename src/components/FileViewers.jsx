import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Player } from "video-react";
const FileViewers = (props) => {
  let { src, type, poster } = props;
  useEffect(() => {

  }, []);

  return (
    <>
      {type === "เอกสาร" && (<>
        {poster !== "" ? (

          <Image
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
            src={`${import.meta.env.VITE_BASE_URL}/${poster}`}
          />) : (<>
           <center>   <Image
              style={{ width: "160px",height:'160px',marginTop:'20px'}}
              src='google-docs.png'
            /></center>
          </>)}

      </>)}

      {type === "รูปภาพ" && (
        <Image
          className="img-infor"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
