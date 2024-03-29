import React, { useState, useEffect, useContext } from "react";
import { Nav } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Alert,
  Image,
} from "react-bootstrap";
import "./Admin.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ModalGroup from "./ModalGroup";
import Swal from "sweetalert2";
import FileViewers from "./FileViewers";
import MmsIcon from "@mui/icons-material/Mms";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import DatasetIcon from "@mui/icons-material/Dataset";
import TableChartIcon from "@mui/icons-material/TableChart";
import Upload from "./Upload";
import ProgressBar from "@ramonak/react-progress-bar";
import { AuthData } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const Admin = () => {
  const { isLogin } = useContext(AuthData);
  const navigate = useNavigate();
  const [progressBar, setProgressBar] = useState(0);
  const [detail, setDetail] = useState("");

  const [show, setShow] = useState(false);
  const [showInfor, setShowInfor] = useState(false);
  const [showGroup, setShowGroup] = useState(false);

  const [subId, setsubId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [subNameUpdate, setsubNameUpdate] = useState("");
  const [groupName, setGroupName] = useState("");

  const [selectMenu, setSelectMenu] = useState("");

  //ชื่อสารสนเทศ
  const [informationName, setinformationName] = useState("");
  //หมวดหมู่สารสนเทศ
  const [informationType, setInformationType] = useState([]);
  const [typeName, setTypeName] = useState("");
  //ประเภทย่อย
  const [subType, setType] = useState([]);

  //เพิ่มประเภทย่อยสารสนเทศ
  const [subNameType, setsubNameType] = useState("");

  //ชื่อสารสนเทศสำหรับ update
  const [inforName, setInforName] = useState("");

  //รหัสสารสนเทศ
  const [forId, setForId] = useState(null);

  //สารสนเทสทั้งหมด
  const [informations, setInformations] = useState([]);

  const [fileName, setFileName] = useState("");
  const [fileNew, setFileNew] = useState("");

  const handleClose = () => setShow(false);
  const handleCloseInfor = () => setShowInfor(false);
  const handleCloseGroup = () => setShowGroup(false);


  const handleShowInfor = (id, subname) => {
    setsubId(id);
    setsubNameUpdate(subname);
    setShowInfor(true);
  };

  const handleShowGroup = (id, GroupName) => {
    setGroupId(id);
    setGroupName(GroupName);
    setShowGroup(true);
  };

  const getData = (data) => {
    if (data === "update") {
      getInformationType();
    }
  };

  //show modal for update information
  const handleShow = async (id) => {
    setForId(id);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/InformationId.php?id=${id}`);
    const data = await response.json();
    console.log(data);
    setinformationName(data[0].informationName);
    setDetail(data[0].detail);
    setFileName(data[0].sources);
    setShow(true)
  };

  //แก้ไขสารสนเทศ
  const updateInfor = async () => {

    if (fileNew) {
      let formData = new FormData();
      let pathname = "";
      formData.append("file", fileNew);

      //delete file old 
      fetch(`${import.meta.env.VITE_BASE_URL}/file/index.php?filename=${fileName}`, { method: 'DELETE' })

      await fetch(`${import.meta.env.VITE_BASE_URL}/file/index.php`, {
        method: "POST",
        body: formData
      }).then(respone => respone.json())
        .then((data) => {
          console.log(data)
          pathname = data.path
        }
        )

      const body = {
        sources: pathname,

      };

      //update information again 

      await fetch(`${import.meta.env.VITE_BASE_URL}/information/updatefile.php?id=${forId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT", body: JSON.stringify(body)
        }
      ).then((res) => {
        if (res.status === 200) {
          Swal.fire("แก้ไข", "แก้ไขข้อมูลสำเร็จ", "success");
        }
      })


    } else {
      const body = {
        detail: detail,
        informationName: informationName,
      };

      fetch(`${import.meta.env.VITE_BASE_URL}/information/index.php?id=${forId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body)
      }

      ).then((res) => {
        if (res.status === 200) {
          getAllInformations();
          Swal.fire("แก้ไขข้อมูล", "แก้ไขข้อมูลสำเร็จ", "success");

        }
      })

    }

    handleClose();
    //getinformationas 


  };

  //update sub name
  const updateSubName = async (e) => {
    e.preventDefault();
    const body = { subname: subNameUpdate };
    await axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/subinformationType/index.php?id=${subId}`,
        body
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("แก้ไข", "แก้ไขข้อมูลสำเร็จ", "success");
        }
      });
    handleCloseInfor();
    getsubInformation(typeName);
  };

  //ลบข้อมูลสารสนเทศ
  const deleteInformationId = async (id, path, poster) => {

    Swal.fire({
      title: "ต้องการลบข้อมูล หรือ ไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BASE_URL}/information/index.php?id=${id}`, { method: 'DELETE' })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("ลบข้อมูลสำเร็จ", "success");
              getAllInformations();
            }
          });

        //delete file 
        fetch(`${import.meta.env.VITE_BASE_URL}/file/index.php?filename=${path}`, { method: 'DELETE' })
        fetch(`${import.meta.env.VITE_BASE_URL}/file/index.php?filename=${poster}`, { method: 'DELETE' })
      }


    });
  };

  //ลบข้อมูลประเภทย่อยสารสนเทศ
  const deleteSubInformationId = async (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูล หรือ ไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BASE_URL}/subinformationType/index.php?id=${id}`, { method: 'DELETE' })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("ลบข้อมูล!", "ลบข้อมูลสำเร็จ", "success");

            }
          });
      }
    });
    await getsubInformationID(typeName);
  };

  //ลบข้อมูลกลุ่มสารสนเทศ
  const deleteInformationType = async (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูล หรือ ไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`${import.meta.env.VITE_BASE_URL}/informationType/index.php?id=${id}`, { method: 'DELETE' })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("ลบข้อมูล!", "ลบข้อมูลสำเร็จ", "success");

              getInformationType();
            }
          });
      }
    });
  };

  //ดึงข้อมูลกลุ่มสารสนเทศ
  const getInformationType = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/informationType/index.php`);
    const data = await response.json();
    setInformationType(data);
  };

  //ดึงข้อมูลสารสนเทศทั้งหมด
  const getAllInformations = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/information/index.php`);
    const data = await response.json();
    setInformations(data);
  };

  //ดึงข้อมูลประเภทย่อยทั้งหมด
  const getsubInformation = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/subinformationType/index.php`);
    const data = await response.json();
    setType(data);

  };

  //ดึงข้อมูลประเภทย่อยจาก id
  const getsubInformationID = async (id) => {
    console.log(id)
    setTypeName(id);
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/subinformationType/informationTypeId.php?id=${id}`);
    const data = await response.json();
    setType(data);
  };

  //เลือกเมนูต่าง ๆ
  const onSelectMenu = (menu) => {
    setSelectMenu(menu);
    if (menu === "informations") {
      getAllInformations();
    }
  };

  //เพิ่มข้อมูลประเภทย่อย ในหมวดหมู่
  const addSubtype = async (e) => {

    e.preventDefault();
    if (subNameType !== "") {
      const body = { informationTypeId: typeName || informationType[0].InformationTypeId, subname: subNameType };
      await fetch(`${import.meta.env.VITE_BASE_URL}/subinformationType/index.php`,
        {
          method: 'POST',
          body: JSON.stringify(body)
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จ",
              showConfirmButton: false,
            });
          }
        });
      await getsubInformationID(typeName || informationType[0].InformationTypeId);
    } else {
      Swal.fire({
        icon: "success",
        title: "กรุณากรอกข้อมูลก่อนบันทึก",
        showConfirmButton: false,
      });
    }

    setsubNameType()
  };

  //เพิ่มหมวดหมู่สารสนเทศ
  const addInformationType = async (e) => {
    e.preventDefault();
    if (inforName !== "") {
      const body = { typeName: inforName };

      await fetch(`${import.meta.env.VITE_BASE_URL}/informationType/index.php`,
        { method: 'POST', body: JSON.stringify(body) })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      setInforName("")
      await getInformationType();
    }
  };

  useEffect(() => {
    if (isLogin === "nologin") {
      navigate("/login");
      console.log("check login admin", isLogin);
    }
  }, []);

  useEffect(() => {
    setSelectMenu("informations");
    getInformationType();
    getAllInformations();
    getsubInformation();
  }, []);

  useEffect(() => { }, [informations]);

  return (
    <div style={{ marginBottom: '200px' }}>
      <Container fluid>
        <Row>
          <Col sm={3} id="sidebar-wrapper">
            <Nav className="d-md-block  sidebar">
              <div className="profile p-4 text-center">
                <Image

                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  src={
                    `${import.meta.env.VITE_BASE_URL}/${localStorage.getItem("profile")}`
                  }
                />
                <h6> ผู้ใช้ : {localStorage.getItem("name")}</h6>
              </div>

              <Nav.Item onClick={() => onSelectMenu("upload")}>
                <Nav.Link style={{ color: "#fff", width: '100%' }}>
                  {" "}
                  <MmsIcon /> อัพโหลดสารสนเทศ
                </Nav.Link>
              </Nav.Item>

              <Nav.Item onClick={() => onSelectMenu("informations")}>
                <Nav.Link style={{ color: "#fff" }}>
                  <FolderCopyIcon /> ข้อมูลสารสนเทศทั้งหมด
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => onSelectMenu("informationAll")}>
                <Nav.Link style={{ color: "#fff" }}>
                  <DatasetIcon /> ข้อมูลประเภทสารสนเทศ
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => onSelectMenu("informationtype")}>
                <Nav.Link style={{ color: "#fff" }}>
                  <TableChartIcon /> ข้อมูลหมวดหมู่สารสนเทศ
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9} id="page-content-wrapper">
            <Card className="mt-4" style={{ borderRadius: "12px" }}>
              <Card.Body>
                {selectMenu === "upload" && (
                  <Upload
                    setSelectMenu={setSelectMenu}
                    getsubInformation={getsubInformation}
                    subType={subType}
                    informationType={informationType}
                    getAllInformations={getAllInformations}
                  />
                )}

                {selectMenu === "informations" && (
                  <>
                    <div className="text-center">
                      {" "}
                      <h5>ข้อมูลสารสนเทศทั้งหมด</h5>{" "}
                    </div>

                    <Row className="mt-3">
                      {
                        informations.map((data) => {

                          return (<>
                            <Col md={4}>
                              <Card className="mb-2">
                                <Card.Body>
                                  <Card.Title> {data.informationName}</Card.Title>
                                  <FileViewers
                                    className="infor-item"
                                    src={data.sources}
                                    type={data.fileType}
                                    poster={data.poster}
                                  />
                                  <br />
                                  <span className="mt-4">รายละเอียด :  {data.detail} </span><br />
                                  <span>หมวดหมู่ :  {data.subname} </span><br />
                                  <span>กลุ่มเนื้อหา :  {data.groupName} </span><br />
                                  <span>ประเภทสารสนเทศ :  {data.fileType} </span><br />
                                  <Row className="mt-4">
                                    <Col sm={6} xs={6}>
                                      <Button
                                        style={{ color: "#fff" }}
                                        onClick={() =>
                                          handleShow(data.informationId)
                                        }
                                        variant="warning"
                                      >
                                        <EditIcon />
                                      </Button>
                                    </Col>
                                    <Col sm={6} xs={6}>
                                      <Button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() =>
                                          deleteInformationId(
                                            data.informationId,
                                            data.sources,
                                            data.poster
                                          )
                                        }
                                        variant="danger"
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    </Col>
                                  </Row>

                                </Card.Body>


                              </Card>

                            </Col>

                          </>)
                        })
                      }

                    </Row>

                    {informations.length === 0 && (
                      <Alert className="text-center" variant="primary">
                        {" "}
                        ไม่มีข้อมูลสารสนเทศ{" "}
                      </Alert>
                    )}
                  </>
                )}
                {selectMenu === "informationtype" && (
                  <>
                    <div className="text-center">
                      {" "}
                      <h5>ข้อมูลหมวดหมู่สารสนเทศ</h5>{" "}
                    </div>

                    <Form onSubmit={(e) => addInformationType(e)}>
                      <Row>
                        <Col sm={4} xs={6}>
                          <Form.Group>
                            <Form.Label>เพิ่มหมวดหมู่</Form.Label>
                            <Form.Control
                              required
                              value={inforName}
                              onChange={(e) => setInforName(e.target.value)}
                              placeholder="เพิ่มหมวดหมู่"
                              type="text"
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={8} xs={6}>
                          <Button

                            type="submit"
                            variant="primary"
                            style={{ marginTop: "32px" }}
                          >
                            {" "}

                            <AddCircleOutlineIcon />  เพิ่มข้อมูล
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                    <Table responsive bordered hover className="mt-4">
                      <thead>
                        <tr>

                          <th>หมวดหมู่</th>
                          <th>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {informationType?.map((data) => {
                          return (
                            <tr key={data.InformationTypeId}>
                              <td>{data.typeName}</td>
                              <td>
                                <Row>
                                  <Col xs={6}>
                                    <Button
                                      style={{ color: "#fff" }}
                                      onClick={() =>
                                        handleShowGroup(
                                          data.InformationTypeId,
                                          data.typeName
                                        )
                                      }
                                      variant="warning"
                                    >
                                      <EditIcon />
                                    </Button>{" "}
                                  </Col>
                                  <Col xs={6}>
                                    <Button
                                      onClick={() =>
                                        deleteInformationType(
                                          data.InformationTypeId
                                        )
                                      }
                                      variant="danger"
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}

                {selectMenu === "informationAll" && (
                  <>
                    <div className="text-center">
                      {" "}
                      <h5>ข้อมูลประเภทสารสนเทศ</h5>{" "}
                    </div>

                    <Form className="mt-4" onSubmit={(e) => addSubtype(e)}>
                      <Row >
                        <Col sm={4} xs={12}>
                          <Form.Group className="mt-4">
                            <Form.Label>เลือกหมวดหมู่สารสนเทศ </Form.Label>
                            <Form.Select
                              onChange={(e) =>
                                getsubInformationID(e.target.value)
                              }
                            >
                              {informationType.map((data) => {
                                return (
                                  <option value={data.InformationTypeId}>
                                    {data.typeName}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col sm={4} xs={12}>
                          <Form.Group className="mt-4">
                            <Form.Label>เพิ่มประเภทสารสนเทศ</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="ประเภทสารสนเทศ"
                              value={subNameType}
                              onChange={(e) => setsubNameType(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={4}   xs={12}>
                          <Button
                            type="submit"

                            variant="primary"
                            style={{ marginTop: "55px" }}
                          >
                            {" "}

                            <AddCircleOutlineIcon />    เพิ่มข้อมูลเภทสารสนเทศ{" "}
                          </Button>
                        </Col>
                      </Row>
                    </Form>

                    <Table responsive hover className="mt-4">
                      <thead>
                        <tr>

                          <th>ประเภท</th>
                          <th>จัดการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subType?.map((data) => {
                          return (
                            <tr key={data.subInformationId}>

                              <td>{data.subname}</td>
                              <td>
                                <Row>
                                  <Col xs={6}>
                                    <Button

                                      style={{ color: "#fff", width: 'auto' }}
                                      onClick={() =>
                                        handleShowInfor(
                                          data.subInformationId,
                                          data.subname
                                        )
                                      }
                                      variant="warning"
                                    >
                                      <EditIcon />
                                    </Button>{" "}
                                  </Col>
                                  <Col xs={6}>
                                    <Button
                                      style={{ marginLeft: '8px' }}
                                      onClick={() =>
                                        deleteSubInformationId(
                                          data.subInformationId
                                        )
                                      }
                                      variant="danger"
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลสารสนเทศ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mt-4">
              <Col sm={12}>
                <Form.Group className="mb-4 mt-4">
                  <Form.Label>ชื่อสารสนเทศ</Form.Label>
                  <Form.Control
                    type="text"
                    value={informationName}
                    placeholder="ชื่อเรื่องสารสนเทศ"
                    onChange={(e) => setinformationName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12}>
                <Form.Group className="mb-4 mt-4">
                  {progressBar > 0 && (
                    <>
                      <Alert variant="danger">
                        {" "}
                        กรุณาอย่าปิดหน้าต่าง หรือ รีเฟรชหน้าจอ{" "}
                      </Alert>
                      <ProgressBar
                        className="mt-2 mb-2"
                        completed={progressBar}
                      />
                    </>
                  )}

                  {/* <Form.Label>อัพโหลดไฟล์ใหม่</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="ไฟล์ใหม่"
                    onChange={(e) => setFileNew(e.target.files[0])}
                  /> */}
                </Form.Group>

              </Col>

              <Col sm={12}>
                <Form.Group>
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    type="text"
                    value={detail}
                    placeholder="รายละเอียด"
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => updateInfor()}>
            บันทึกข้อมูล
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="sx"
        show={showInfor}
        onHide={handleCloseInfor}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขประเภทสารสนเทศ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="update-sub"
            onSubmit={(e) => updateSubName(e)}>
            <Row className="mt-4">
              <Col sm={12}>
                <Form.Group className="mb-4">
                  <Form.Label>ประเภท</Form.Label>
                  <Form.Control
                    type="text"
                    value={subNameUpdate}
                    placeholder="ประเภทสารสนเทศ"
                    onChange={(e) => setsubNameUpdate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            form="update-sub"
            type="submit"
            variant="success">
            แก้ไข
          </Button>
          <Button variant="danger" onClick={handleCloseInfor}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalGroup
        onSubmit={getData}
        show={showGroup}
        onHide={handleCloseGroup}
        groupname={groupName}
        Id={groupId}
      />
    </div>
  );
};

export default Admin;
