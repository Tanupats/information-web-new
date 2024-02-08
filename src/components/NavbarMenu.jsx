import React, { useEffect, useContext } from "react";
import { Container, Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";
import "./index.css";
import Information from "./Information";
import InforDetail from "./Infordetail";
import { AuthData } from "../AuthContext";
import Docview from "./Docview";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ResetPassword from "./ResetPassword";
function NavbarMenu() {
  const { isLogin, setIsLogin } = useContext(AuthData);
  let role = localStorage.getItem("role");
  console.log(isLogin);
  const Logout = () => {
    localStorage.clear();
    setIsLogin("nologin");
    window.location.href = "/login";
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Router >
        <Navbar expand="lg" sticky="top" style={{padding:'10px'}}> 
          <Container fluid>
            <Navbar.Brand>
              {" "}
              <Image
                src="logo.jpg"
                style={{
                  width: "35px",
                  height: "35",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginLeft:'12px'
                }}
              />{" "}
            </Navbar.Brand> 

            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{color:'#fff'}} />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link  style={{color:'#fff'}}>ระบบข้อมูลสารสนเทศ</Nav.Link>
                <Nav.Link as={Link} to={"/"}  style={{color:'#fff'}}>
                  หน้าหลัก
                </Nav.Link>
                <Nav.Link as={Link} to={"/information"}  style={{color:'#fff'}}>
                  สารสนเทศทั้งหมด
                </Nav.Link>
              
              </Nav> 
               <Nav>
                {isLogin === "loginged" && (
                  <>
                    {role === "admin" && (
                      <Nav.Link  
                      style={{color:'#fff'}}
                      as={Link} to={"/admin"}>
                        จัดการข้อมูลสารสนเทศ
                      </Nav.Link>
                    )}
                    <Nav.Link  style={{color:'#fff'}}> <AccountCircleIcon /> {localStorage.getItem("name")}</Nav.Link>
                    <Nav.Link
                    style={{color:'#fff'}}
                      onClick={() => {
                        Logout();
                      }}
                    >
                    <LogoutIcon  style={{color:'#fff'}}  /> ออกจากระบบ
                    </Nav.Link>
                  </>
                )}

                {isLogin === "nologin"  && (
                  <>
                    <Nav.Link   style={{color:'#fff'}}  as={Link} to={"/login"}>
                    <LoginIcon /> เข้าสู่ระบบ
                    </Nav.Link>

                    <Nav.Link   style={{color:'#fff'}}  as={Link} to={"/register"}>
                    <AppRegistrationIcon />  ลงทะเบียน
                    </Nav.Link>
                  </>
                )}
              </Nav> 
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/admin" Component={Admin}></Route>
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
          <Route path="/information" Component={Information}></Route>
          <Route path="/detail/:informationId" Component={InforDetail}></Route>     
          <Route path="/docview" Component={Docview}></Route>
          <Route path="/docview/:Id" Component={Docview}></Route>
          <Route path="/resetpassword" Component={ResetPassword}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default NavbarMenu;
