import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Button,
  Badge,
  Image,
} from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import FileViewers from "./FileViewers";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const Information = () => {
  const navigate = useNavigate();
  const [informationType, setInformationType] = useState([]);
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [inforGroup, setInforGroup] = useState([]);

  //กลุ่มประเภทสารสนเทศ
  const getInformationType = async () => {

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/informationType/index.php`);
    const data = await response.json();
    setInformationType(data);
  };


  const getSubInformationType = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/informationType/informationTypeId.php?id=${id}`);
    const data = await response.json();
    setInforGroup(data);
  };


  const getAllInformations = async () => {
    setInforGroup([]);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/index.php`);
    const movies = await response.json();
    setData(movies);

  };


  const searchInformation = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/searchKey.php?key=${searchName}`);
    const data = await response.json();
    setData(data);

  };

  const searchByInformation = async (subname) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/searchByInformation.php?subname=${subname}`);
    const data = await response.json();
    setData(data);
  };

  const filterByGroup = async (groupname) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/filterGroup.php?group=${groupname}`);
    const data = await response.json();
    setData(data);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    searchInformation();
  };

  const reSetGroup = () => {
    setInforGroup([]);
  };

  useEffect(() => {
    getInformationType();
    getAllInformations();
  }, []);

  useEffect(() => {

    console.log(inforGroup)
  }, []);

  return (
    <>
      <Container fluid>
        <Card style={{ borderRadius: "0px", marginBottom: "60px",background:'none' }}>
          <Card.Body style={{ padding: "12px" }}>
            {informationType.length > 0 && (
              <>
                <Row style={{ marginTop: "60px" }}>
                  <Form className="mb-4 p-0" onSubmit={handleSubmit}>
                    <Row>
                      <Col sm={2} xs={12} className="p-0 ">
                        <DropdownButton
                          style={{ width: "100%" }}
                          id="dropdown-basic-button"
                          title="หมวดหมู่สารสนเทศ"
                          className="w-100 mb-2"
                        >
                          {informationType?.map((item) => {
                            return (
                              <>
                                <Dropdown.Item
                                  onClick={() =>
                                    getSubInformationType(
                                      item.InformationTypeId
                                    )
                                  }
                                >
                                  {item.typeName}
                                </Dropdown.Item>
                              </>
                            );
                          })}
                        </DropdownButton>
                      </Col>

                      <Col sm={8} xs={8}>
                        <Form.Control
                          className="w-100"
                          type="search"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          placeholder="ค้นหาสารสนเทศ"
                        />
                      </Col>
                      <Col sm={2} xs={4}>
                        <Button
                          variant="primary w-100"
                          style={{ marginRight: "12px", marginLeft: "12px" }}
                          type="submit"
                        >
                          <SearchIcon />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </>
            )}

            {inforGroup.length > 0 && (
              <Row style={{ marginBottom: "60px" }} className="group-line">
                <Col sm={12}>
                  {" "}
                  <CancelIcon
                    className="cancel-btn"
                    onClick={() => reSetGroup()}
                  />
                </Col>
                {inforGroup?.map((data) => {
                  return (
                    <Col
                      sm={3}
                      onClick={() => searchByInformation(data.subname)}
                    >
                      <Card className="mt-4 menu-group-items">
                        <Card.Body style={{ padding: "12px", marginTop: "0" }}>
                          <Card.Title className="text-center">
                            {data.subname}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            )}

            <Row className="text-center">
              <h3 style={{ color: "#673382", marginTop: "12px" }}>
                สารสนเทศทั้งหมด
              </h3>
            </Row>

            <Row>
              <Form>
                <Form.Group>
                  <Form.Label>แสดงจากหมวดหมู่</Form.Label>
                  <Col>
                    <h4>
                      <Badge
                        style={{
                          fontWeight: "normal",
                          cursor: "pointer",
                        }}
                        onClick={() => getAllInformations()}
                      >
                        แสดงทั้งหมด
                      </Badge>
                    </h4>
                  </Col>
                  {informationType?.map((item) => {
                    return (
                      <>
                        <Col sm={4}>
                          <h4>
                            <Badge
                              style={{
                                fontWeight: "normal",
                                cursor: "pointer",
                              }}
                              onClick={() => filterByGroup(item.typeName)}
                            >
                              {item.typeName}
                            </Badge>
                          </h4>
                        </Col>
                      </>
                    );
                  })}
                </Form.Group>
              </Form>
            </Row>

            <Row style={{ marginBottom: "160px" }}>
              {data.length > 0 && (
                <>
                  {data?.map((data) => {
                    return (
                      <Col sm={3} className="mt-4"  onClick={() =>
                        navigate(`/detail/${data.informationId}`)
                      }>
                        <Card
                          style={{
                            padding: "0px",
                           
                            height: "auto",
                          }}
                          className="mt-4"
                        >
                          <Card.Body style={{ padding: "0px" }}>
                            <Row>
                              <Col sm={12} className="p-0">


                                <FileViewers
                                  className="infor-item"
                                  src={data.sources}
                                  type={data.fileType}
                                  poster={data.poster}
                                />



                              </Col>
                              <div
                                className="mt-3"
                               
                              >
                                <h5
                                  onClick={() =>
                                    navigate(`/detail/${data.informationId}`)
                                  }
                                >
                                 
                                  {data.informationName}
                                </h5>
                                <span>รายละเอียด :  {data.detail} </span><br/>
                                <span>หมวดหมู่ :  {data.subname} </span><br/>
                                <span>กลุ่มเนื้อหา :  {data.groupName} </span><br/>
                                <span>ประเภทสารสนเทศ :  {data.fileType} </span><br/>
                                <div className="mt-2 mb-2">
                                  <CalendarMonthIcon />
                                  {` ${new Date(
                                    data.dateTime
                                  ).toLocaleTimeString("en-US")} 
                              ${new Date(data.dateTime).toDateString("en-US")}`}
                                </div>
                              </div>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Information;
