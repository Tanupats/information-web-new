import React  from "react";
import {Row,Col} from 'react-bootstrap';
import './index.css';
const Footer = ()=>{

    return (
 
         <Row className="mt-4">
               <div className="footer">
             <Col sm={12} className="text-center p-4">
                <span>ระบบข้อมูลสารสนเทศ </span>
                <span>สาขาวิชาศิลปศาสตร์และศึกษาศาตร์  </span> <br />
                <span>มหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย  </span>
            
              
             </Col> 
             </div>
         </Row>
   
    )
}
export default Footer;