import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Image, Alert } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigae = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [role, setRole] = useState("student");
  const [roleStudent, setRoleStudent] = useState(true);
  const [roleTeacher, setroleTeacher] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [img, setImg] = useState("");
  const [emailCheck, setEmailCheck] = useState(null);

  let path = "";
  const uploadProfile = async () => {

    if (profile) {

      let formData = new FormData();
      formData.append("file", profile);

      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/file/index.php`, {
          method: "POST",
          body: formData,
        }).then(respone => respone.json())
          .then((data) => {
            console.log(data)
            path = data.path
          }

          )
      } catch (error) {

        console.error("Error:", error);
      }
    }
  }
  const validateEmail = (email) => {
    // สร้าง Regular Expression ที่รับเฉพาะภาษาอังกฤษ
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // ใช้ test() เพื่อตรวจสอบว่าอีเมลผ่าน Regex หรือไม่
    return regex.test(email);
  }

  const handleEmail = (val) => {
    setEmail(val)
    let validEmail = validateEmail(val)
    console.log(validEmail)
    setEmailCheck(validEmail);
  }

  const add = async () => {

    if (emailCheck) {

      await uploadProfile()
      const body = {
        name: name,
        email: email,
        profile: path,
        password: password,
        role: role,
        systemName: "information"
      }

      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/index.php`,
        body
      )
        .then(data => {

          if (data.status === 200) {
            navigae('/login')
          }
        }

        ).catch(err => {
          setErrMsg(err)
        })
    }



  };



  const handelUpload = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setProfile(e.target.files[0]);
  };

  useEffect(() => {

  }, [errMsg])

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

                  <Form.Control type="file" onChange={(e) => handelUpload(e)} required></Form.Control>
                  <Form.Group className="mb-2">
                    <Form.Label className="mt-2">ชื่อ-นามสกุล (ภาษาไทย หรือภาษาอังกฤษ)</Form.Label>
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
                    {
                      emailCheck === false && (<> <p style={{ color: 'red' }}> *กรุณากรอกอีเมลให้ถูกต้องตามรูปแบบ</p></>)
                    }
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Email"
                      required
                      onChange={(e) => handleEmail(e.target.value)}
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
                  <Form.Label className="mt-2">เลือกประเภทผู้ใช้</Form.Label> {" "}
                  <Form.Group

                    className="mt-2 d-flex">

                    <Form.Check
                      style={{ marginRight: '12px' }}
                      onClick={() => {
                        setRoleStudent(true);
                        setRole("student");
                        setroleTeacher(false);
                      }}
                      checked={roleStudent}
                      value={roleStudent}
                      type="radio"
                      label="student"
                    ></Form.Check> {" "}
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
                <hr />
                <div className="text-center">

                  <a href="/login">ถ้ามีบัญชีผู้ใช้อยู่แล้ว คลิกเข้าสู่ระบบ</a>
                </div>
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
