import React, { useState, useContext } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../AuthContext";
const Login = () => {
  const { setIsLogin } = useContext(AuthData);
  const navigae = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  async function handelSubmit() {

    const data = {
      email: email,
      password: password,
      systemName: "information"
    };

    try {
      await fetch("http://localhost/leadkku-api/login/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(respone => respone.json())
        .then((data) => {
          console.log(data)
          if (data.length > 0) {
            setIsLogin("loginged")
            localStorage.setItem("name", data[0].name)
            localStorage.setItem("profile", data[0].profile)
            localStorage.setItem("role", data[0].role)
            localStorage.setItem("auth","loginged")
            if (data[0].role === "student") {
              navigae('/information')
            }
            if (data[0].role === "admin") {
              navigae('/admin')
            }

          }
          if (data.length === 0) {
            setMessage("login false")
          }
        }


        )
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6} className="p-0">
          <div className="login-form">
            <Row>
              <Col sm={6} className="p-0">
                <Image
                  src="bg-login.png"
                  style={{ width: "100%", height: "auto" }}
                />
              </Col>
              <Col sm={6}>
                <Form className="section-form" >
                  <h4 className="text-center mt-4" style={{ color: '#673382' }}> เข้าสู่ระบบ</h4>

                  <Form.Group className="mb-4">
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

                  {message !== "" && (<Alert variant="danger" className="mt-4">{message}</Alert>)}



                  <Button
                    onClick={() => handelSubmit()}

                    variant="success"
                    className="w-100 mt-2"
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Form>

                <div className="text-center mt-2">
                  <p>หรือ </p>
                </div>
                <Button variant="primary"
                  className="w-100"
                  onClick={() => navigae("/register")} >
                  ลงทะเบียน</Button>




              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  );
};

export default Login;
