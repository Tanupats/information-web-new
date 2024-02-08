import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import FileViewers from "./FileViewers";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DownloadIcon from '@mui/icons-material/Download';
const InforDetail = () => {
  const navigate = useNavigate();
  const { informationId } = useParams();
  const [data, setData] = useState({});

  function downloadURI(uri, name) {
    if (uri !== "") {
      var link = document.createElement("a");
      link.download = name;
      link.href = `${import.meta.env.VITE_BASE_URL}/${uri}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const getOneInformation = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/InformationId.php?id=${informationId}`);
    const data = await response.json();
    console.log(data);
    setData(...data);

  };

  useEffect(() => {
    if (informationId) {
      getOneInformation()
    }
  }, []);

  return (
    <Container fluid>
      <Card style={{ marginBottom: "160px", borderRadius: '0px' }}>
        <Card.Body style={{ marginTop: "30px" }}>

          <Row>
            <Col sm={4}>

              <div className="file-views">

                {data.fileType === "เอกสาร" && (
                  <Image src={`${import.meta.env.VITE_BASE_URL}/${data.poster}`} style={{ width: '100%' }} />
                )}

                {data.fileType === "วิดิโอ" && (

                  <FileViewers src={data.sources} type={data.fileType} poster={data.poster} />

                )}
                {data.fileType === "รูปภาพ" && (

                  <FileViewers src={data.sources} type={data.fileType} poster={data.poster} />

                )}

              </div>

            </Col>

            <Col sm={8}>
              <Card.Title as="h4" style={{ color: '#673382' }}
                className="text-left mb-4 mb-4"> รายละเอียดข้อมูลสารสนเทศ</Card.Title>
              <h5> ชื่อเรื่อง :  {data.informationName}</h5>
              <h5> ประเภทสารสนเทศ : {data.fileType}</h5>
              <h5> หมวดหมู่สารสนเทศ :  {data.subname}</h5>
              <h5> รายละเอียด :  {data.detail}</h5>
              <h6> <CalendarMonthIcon />
                {` ${new Date(data.dateTime).toLocaleTimeString('en-US')} 
                              ${new Date(data.dateTime).toDateString('en-US')}`}
              </h6>

              {
                data.fileType === "เอกสาร" && (
                  <Button
                    variant="success"
                    onClick={() => downloadURI(data.sources, data.informationName)} className="mt-4">

                    <DownloadIcon />  ดาวน์โหลดไฟล์

                  </Button>
                )
              }


              <Button
                style={{ marginLeft: '20px' }}
                onClick={() => navigate("/information")}
                className="mt-4">
                {" "}
                <ArrowBackIosIcon />  กลับไปยังหน้าสารสนเทศ{" "}
              </Button>

            </Col>

          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default InforDetail;
