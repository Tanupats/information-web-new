import React, { useEffect, useState } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'
const ModalGroup = (props) => {
  console.log(props)
  const [name, setName] = useState("")
  const { Id } = props;
  //update groupName    
  const updateGroup = async (e) => {
    e.preventDefault();
    props.onHide();
    const body = { typeName: name }
    await fetch(`${import.meta.env.VITE_BASE_URL}/informationType/index.php?id=${Id}`,
      {
        method: 'PUT',
        body: JSON.stringify(body)
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            '',
            'แก้ไขข้อมูลสำเร็จ',
            'success'
          )
          props.onSubmit('update');
        }
      });
  }


  useEffect(() => {
  }, [])

  return (
    <>
      <Modal size="sx" show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขหมวดหมู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="update-group" onSubmit={(e)=>updateGroup(e)}>
            <Row className="mt-4">
              <Col sm={12}>
                <Form.Group className="mb-4">
                  <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={props.groupname}
                    placeholder="ประเภทสารสนเทศ"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
          type="submit"
          form="update-group"
          variant="success">
            บันทึก
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalGroup;