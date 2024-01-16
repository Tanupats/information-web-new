import React, { useState } from "react";
import { Col, Row, Form, Button, Image, Alert } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigae = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("img-profile");
  const [role, setRole] = useState("student");
  const [roleStudent, setRoleStudent] = useState(true);
  const [roleTeacher, setroleTeacher] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState("");

   function add  ()  {

    // let formData = new FormData();
    // formData.append("photo", profile);
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("systemName", "information");
    // formData.append("role", role);

    const body = {
      name: name,
      email: email,
      profile: "oop",
      password: password,
      role: role,
      systemName:"information"
    }

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/index.php`,body)
      .then((res)=>{
        if(res.status===200){
          navigae('/login')
        }
      })
   

  };

  const handelUpload = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setProfile(e.target.files[0]);
  };

  return (
    <div>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6} className="p-0">
          <div className="login-form">
            <Row>
              <Col sm={12}>
                <Form className="section-form" enctype='multipart/form-data' >
                  <h5 className="text-center"> ลงทะเบียนผู้ใช้งาน</h5>
                  {img !== "" ? (
                    <div className="profile text-center">
                      <Image src={img} />
                    </div>
                  ) : (
                    <div className="profile text-center">
                      <Image src='avatar-1968236_1280.png' />
                    </div>
                  )}

                  <Form.Control type="file" onChange={(e) => handelUpload(e)} ></Form.Control>
                  <Form.Group className="mb-2">
                    <Form.Label>ชื่อ-นามสกุล</Form.Label>
                    <Form.Control
                      value={name}
                      type="text"
                      placeholder="ชื่อ"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="***"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  {errMsg !== "" && (
                    <Alert variant="danger" className="mt-4">อีเมล หรือผู้ใช้นี้ได้ลงทะเบียนเรียบร้อยแล้ว</Alert>
                  )}
                  <Form.Group className="mt-2">
                    <Form.Label>เลือกประเภทผู้ใช้</Form.Label>
                    <Form.Check
                      onClick={() => {
                        setRoleStudent(true);
                        setRole("student");
                        setroleTeacher(false);
                      }}
                      checked={roleStudent}
                      value={roleStudent}
                      type="radio"
                      label="student"
                    ></Form.Check>
                    <Form.Check
                      onClick={() => {
                        setroleTeacher(true);
                        setRole("admin");
                        setRoleStudent(false);
                      }}
                      value={roleTeacher}
                      checked={roleTeacher}
                      type="radio"
                      label="teacher"
                    ></Form.Check>
                  </Form.Group>

                </Form>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-4"
                  onClick={() => add()}
                >
                  ลงทะเบียน
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  );
};

export default Register;
