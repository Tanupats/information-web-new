import React from 'react';
import { Row, Col, Container, Card, Image, Button } from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
const Home = () => {

    const navigate = useNavigate();
    return (
        <>
            <Container fluid>


                <div className="headding">
                    <Row >

                        <Col sm={6} style={{ paddingLeft: '50px' }}>
                            <h1 style={{ color: '#673382', marginTop: '66px' }}>ระบบข้อมูลสารสนเทศ</h1>
                            <h3>สาขาวิชาศิลปศาสตร์และศึกษาศาตร์</h3>

                        </Col>
                        <Col sm={6} className='p-4'>
                            <Image src='image1.png' style={{ width: '100%' }} />
                        </Col>
                    </Row>
                </div>


                <Row style={{ marginTop: '80px', marginBottom: '120px' }}>
                    <div className='text-center mt-4 mb-4 information'>
                        <h4 style={{ color: '#673382' }}>สารสนเทศทั้งหมด</h4>
                    </div>


                    <Col sm={3}>
                        <div className='course-item'>
                            <Card.Body className='text-center'>
                                <Image src='online-learning.png' className='infor-content mb-3' />
                                <Card.Subtitle>
                                    <h5>หลักสูตร</h5>
                                </Card.Subtitle>
                            </Card.Body>
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div className='course-item'>
                            <Card.Body className='text-center'>
                                <Image src='ebook.png' className='infor-content mb-3' />
                                <Card.Subtitle>
                                    <h5> รายวิชา</h5>
                                </Card.Subtitle>
                            </Card.Body>
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div className='course-item'>
                            <Card.Body className='text-center'>
                                <Image src='information.png' className='infor-content mb-3' />
                                <Card.Subtitle>
                                    <h5> ประเภทสารสนเทศ</h5>
                                </Card.Subtitle>
                            </Card.Body>
                        </div>
                    </Col>
                    <Col sm={3}>
                        <div className='course-item'>
                            <Card.Body className='text-center'>
                                <Image src='content.png' className='infor-content mb-3' />
                                <Card.Subtitle>
                                    <h5>เนื้อหาสารสนเทศ</h5>
                                </Card.Subtitle>
                            </Card.Body>
                        </div>
                    </Col>

                    
                </Row>
                <Row>
                <Col sm={6} className='text-center'>
                       <center>
                         <Button
                            style={{ 
                                   
                                borderRadius: "5px",
                       
                             marginBottom: '30px' ,width:'300px',height:'50px'}}
                            onClick={() => navigate('/register')}
                            className='btn-success'>
                          <AppRegistrationIcon /> ลงทะเบียนใช้งาน
                        </Button>
                        </center> 
                    </Col>

                    <Col sm={6}>
                        <center>

                        
                    <Button
                            style={{ 
                              
                             borderRadius: "5px",
                           
                             marginBottom: '100px' ,width:'300px',height:'50px'}}
                            onClick={() => navigate('/information')}
                            className='btn-primary'>
                          <VideoSettingsIcon/> {' '} ไปยังสารสนเทศ
                        </Button></center>
                    </Col>
                </Row>


         

            </Container>
        </>)
}
export default Home;