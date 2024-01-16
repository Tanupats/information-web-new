import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form, Alert, Button, Image } from "react-bootstrap";
import ProgressBar from "@ramonak/react-progress-bar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import axios from "axios";
const Upload = (props) => {
  const {
    informationType,
    subType,
    setSelectMenu,
    getAllInformations,
  } = props;

  const [file, setFile] = useState("");
  const [filePoster, setFilePoster] = useState("");
  const [img, setImg] = useState("uploadfile.png");

  const [fileType, setFileType] = useState("รูปภาพ");
  const fileSupport = ["รูปภาพ", "เอกสาร", "วิดิโอ"];
  const [informationName, setinformationName] = useState("");
  const [detail, setDetail] = useState("");



  //ชื่อหมวดหมู่
  const [typeName, setTypeName] = useState([]);

  //หมดหมู่ย่อย 
  const [subName, setsubName] = useState("โปรเจคสหกิจ");

  //หมวดหมู่สารสนเทศ
  const [typeAll, setTypeAll] = useState("");

  const [progressBar, setProgressBar] = useState(0);

  const [message, setMessage] = useState(false);
  const inputFile = useRef(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onUploaded = () => {
    setTypeName("");
    setsubName("");
    setinformationName("");
    setDetail("");
    setFile("");
    setSelectMenu("informations");
  };

  const handelUpload = (e) => {
    let file = e.target.files[0];
    let Extension = file.name.split(".").pop();
    console.log('poster', Extension)
    if (Extension === "JPG") {
      setImg(URL.createObjectURL(e.target.files[0]));
      setFilePoster(e.target.files[0]);
    } else if (Extension === "jpg") {
      setImg(URL.createObjectURL(e.target.files[0]));
      setFilePoster(e.target.files[0]);
    } else if (Extension === "gif") {
    } else if (Extension === "png" || Extension === "PNG") {
      setImg(URL.createObjectURL(e.target.files[0]));
      setFilePoster(e.target.files[0]);
    } else {
      Swal.fire({
        icon: "success",
        title: "นามสกุลไฟล์ไม่รองรับสำหรับหน้าปก",
        showConfirmButton: false,
      });
      setImg("")
      setFilePoster("")
    }


  };

  const handelUploadFIle = (e) => {
    let file = e.target.files[0];
    validateSelectedFile(file);

    if (file) {
      let fileExtension = file.name.split(".").pop();
      console.log(fileExtension);
      setMessage(file.name);

      if (fileType === "รูปภาพ") {
        if (fileExtension === "JPG") {
          setFile(file);
        } else if (fileExtension === "jpg") {
          setFile(file);
        } else if (fileExtension === "gif") {
          setFile(file);
        } else if (fileExtension === "png" || fileExtension === "PNG") {
          setFile(file);
        } else {
          Swal.fire({
            icon: "success",
            title: "นามสกุลไฟล์ไม่รองรับสำหรับอัพโหลดรูปภาพ",
            showConfirmButton: false,
          });
        }
      }
      if (fileType === "เอกสาร") {
        if (fileExtension === "pdf") {
          setFile(file);
        } else if (fileExtension === "docx") {
          setFile(file);
        } else if (fileExtension === "xlsx") {
          setFile(file);
        } else {
          Swal.fire({
            icon: "success",
            title: "นามสกุลไฟล์ไม่รองรับสำหรับอัพโหลดเอกสาร",
            showConfirmButton: false,
          });
        }
      }
      if (fileType === "วิดิโอ") {
        if (fileExtension === "mp4") {
          setFile(file);
        } else if (fileExtension === "mov") {
          setFile(file);
        } else if (fileExtension === "mpg") {
          setFile(file);
        } else {
          Swal.fire({
            icon: "success",
            title: "นามสกุลไฟล์ไม่รองรับสำหรับอัพโหลดเอกสาร",
            showConfirmButton: false,
          });
        }
      }
    }
  };

  let pathPoster = "";
  let pathFile = "";

  //อัพโหลด poster
  const uploadPoster = async () => {
    if (filePoster) {

      let formData = new FormData();
      formData.append("file", filePoster);
      await axios
        .post(`${import.meta.env.VITE_BASE_URL}/file/index.php`, formData)
        .then((res) => {
          if (res.status === 200) {
            pathPoster = res.data.path;
          }
        });
    }
  };

  const upInformation = async () => {
    let formData = new FormData();
    formData.append("file", file);

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/file/index.php`, formData, {
        onUploadProgress: (event) => {
          setProgressBar(Math.round((100 * event.loaded) / event.total));
          if (event.loaded === event.total) {
            Swal.fire("อัพโหลด", "อัพโหลดข้อมูลสำเร็จ", "success");
          }
        },
      })
      .then((res) => {
        if (res.status === 200) {
          pathFile = res.data.path;
        }
      });
  };

  const validateSelectedFile = (file) => {
    const MAX_FILE_SIZE = 48000; // 100MB

    if (!file) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }

    const fileSizeKiloBytes = file.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than maximum limit");
      setIsSuccess(false);
      return;
    }

    setErrorMsg("");
    setIsSuccess(true);
  };

  //บันทึกข้อมูลสารสนเทศ 
  const uploadInformation = async (e) => {
    e.preventDefault()

    await upInformation();

    await uploadPoster();

    const body = {
      groupName: typeAll,
      subname: subName,
      informationName: informationName,
      detail: detail,
      fileType: fileType,
      poster: pathPoster,
      sources: pathFile,
    };

    await axios.post(`${import.meta.env.VITE_BASE_URL}/information/index.php`, body)
      .then(res => {
        if (res.status === 200) {
          onUploaded()
        }
      })
      ;
    await getAllInformations();

  };

  const getSubname = (typename) => {
    if (typeName.length === 0) {

      setTypeName([{ id: typeName.length + 1, name: typename }]);
    } else {
      setTypeName([...typeName, { id: typeName.length + 1, name: typename }]);

      let result = typeName.filter(obj => obj.name === typename)
      console.log('re', result)
      if (result.length > 0) {
        let newdata = typeName.filter(ob => ob.name !== typename)
        console.log('new data', newdata)
        setTypeName(newdata)
      }


    }




  };

  const cancelUpload = () => {
    setTypeName("");
    setsubName("");
    setinformationName("");
    setDetail("");
    setFile("");
  };

  const getTypeAll = () => {
    let nameList = ""
    console.log(typeName);
    if (typeName.length > 0) {
      typeName.map(data => {

        if (typeAll === "") {
          nameList = data.name
        } else {
          nameList += ' ' + data.name
        }

      })
      setTypeAll(nameList)
      console.log('all', nameList)
    }
  }


  useEffect(() => {
    getTypeAll()

  }, [typeName])

  console.log('tname', typeName)
  // console.log(subName); 
  // console.log(informationName);
  // console.log(fileType);
  // console.log(detail);

  return (
    <>
      <Form enctype="multipart/form-data" className="mt-2" onSubmit={(e) => uploadInformation(e)}>
        <div className="text-center mb-4">
          <h5>อัพโหลดสารสนเทศ </h5>
        </div>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>หมวดหมู่สารสนเทศ { }</Form.Label>

              {

                informationType?.map((item) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      onClick={() =>
                        getSubname(item.typeName)
                      }
                      label={item.typeName}
                    />
                  );
                }
                )}


            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>หมดหมู่ย่อย </Form.Label>
              <Form.Select onChange={(e) => setsubName(e.target.value)}>
                {subType?.map((data) => {
                  return <option value={data.subname}>{data.subname}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>ชื่อสารสนเทศ</Form.Label>
              <Form.Control
                required
                type="text"
                value={informationName}
                placeholder="ชื่อสารสนเทศ"
                onChange={(e) => setinformationName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group>
              <Form.Label>รายละเอียด</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="รายละเอียด"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group>
              <Form.Label>เลือกประเภทไฟล์</Form.Label>

              <Form.Select onChange={(e) => setFileType(e.target.value)}>
                {fileSupport.map((data) => {
                  return <option value={data}>{data}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Alert className="support-files">
              <h5>นามสกุลไฟล์ที่รองรับ{fileType}</h5>
              {fileType === "รูปภาพ" && <span>.JPG .PNG .GIF</span>}
              {fileType === "วิดิโอ" && <span>.mp4 .m4v .mov</span>}
              {fileType === "เอกสาร" && <span>.DOC .PDF .EXECL</span>}
            </Alert>

            <Form.Group className="mt-2">
              {progressBar > 0 && (
                <ProgressBar className="mt-2" completed={progressBar} />
              )}
              <Form.Control
                required
                ref={inputFile}
                style={{ display: "none" }}
                className="mt-2"
                id="my-file"
                type="file"
                name="file"
                onChange={(e) => handelUploadFIle(e)}
              />
            </Form.Group>
            <div className="message" onClick={onButtonClick}>
              <CloudUploadIcon /> อัพโหลดไฟล์ขนาดไม่เกิน 100Mb
              {isSuccess ? (
                <p className="success-message"> {message} </p>
              ) : null}
              <p className="error-message">{errorMsg}</p>
            </div>
          </Col>
          <Col sm={6} className="mt-2">
            {" "}
            <Form.Group className="mt-2">
              <Form.Label>อัพโหลดหน้าปก (สำหรับเอกสาร และวิดิโอ)</Form.Label>
              <Image
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                src={img}
              />

              <Form.Control
                className="mt-2"

                type="file"
                onChange={(e) => handelUpload(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={6}>

            <Button variant="success w-100"
              type="submit"
            >
              {" "}
              บันทึกข้อมูล
            </Button>
          </Col>
          <Col sm={6}>
            <Button variant="danger w-100" onClick={() => cancelUpload()}>
              {" "}
              ยกเลิก
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Upload;
