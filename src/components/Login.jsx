import React, {  useState, useContext } from "react";
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
import axios from "axios";
const Login = () => {
  const { setIsLogin } = useContext(AuthData);
  const navigae = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("")

  const handelSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/login/index.php`, body)
      .then((res) => {
        if (res.status === 200) {
         
          const { name, userId, role,profile } = res.data[0];

          
          localStorage.setItem("name", name);
          localStorage.setItem("userId", userId);
          localStorage.setItem("auth", "loginged");
          localStorage.setItem("role", role);
          localStorage.setItem("profile", profile);
          setIsLogin("loginged");
          navigae("/information");
          
        }
      }).catch(err=>{
          if(err){
             setMessage("รหัสผ่าน หรือ อีเมลไม่ถูกต้อง")
          }
         
      })
      
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
                <Form className="section-form" onSubmit={handelSubmit}>
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
                
                     { message !== "" &&  (  <Alert variant="danger" className="mt-4">{message}</Alert>)}
                    

                 
                  <Button
                    type="submit"
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
                     onClick={()=> navigae("/register")} >
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
