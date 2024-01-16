import React,{useState,useEffect} from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {Col,Row} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import axios from "axios";
function Docview(prpos) {
  const { Id } = useParams();
  const [path,setPath]=useState("")


  const getFile = async ()=>{
        await axios.get(`${import.meta.env.VITE_BASE_URL}/information/InformationId.php?id=${Id}`).then(res=>{
          if(res.status===200){
            console.log(res.data.sources)
            setPath(res.data.sources)
          }
        })
  }

  useEffect(()=>{
      if(prpos.path){
        setPath(prpos.path)
      }else{
        getFile()
      }

  })


    const docs = [
      { uri: `${import.meta.env.VITE_BASE_URL}/${path}`}, // Remote file
     
    ];
  
    return (
        <>
      <Row className="mt-4">

            <center><Col sm={8}>  
         <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
        </Col></center> 
      </Row>
  
    </>
    );
  }

export default Docview;