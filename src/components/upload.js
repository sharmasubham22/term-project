import axios from 'axios';
import React, { useState } from 'react'
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";
import './upload.css';
import clogo from './clogo.png';
import { Alert, AlertTitle, Button } from '@mui/material';

function Upload() {
 let navigate = useNavigate();
 const [messageToDisplay, setmessageToDisplay] = useState(false);
 const [errmessage, setErrmsg] = useState(false);
    const s3 = new AWS.S3({
      accessKeyId: "ASIAUHDWUCHJBBGQHOFW",
      secretAccessKey: "ZZiyafaHg2h7iABjdV1dVsN2RSl7Lpnf/y4pHMTP",
      sessionToken:
        "FwoGZXIvYXdzELz//////////wEaDI4JkfxxAcXJrXeAqyLAAQnY/wlftCPp1rCUAi74hJxQ/Z0zxy26WD5B42pjx5o/5qgvUwQEbvCza1cS0ZaiOWzJ/xRhZ+YVCgOJ+Tu4U3E6qXWhsTuT4Q4cdd1gSXDgppJzPWrAi4a4Z+IHi7o8MTDTOGj1wJcpmAeoI4TK1S2nI2stz68FI4T4m9X/upQ5YlB2oqRUPwrEazetQSkcbIl5YdBzOvMEKvm7gRw5+bn25Z4ec5Rv2ofpn2IaivTfVs3aTphlR/hzt8GU3iiZwiiatdGhBjItd8JUO3Px1Eyt8u0IZg0yD4gmO8ylXgqQ1F4kuaaNVLsIWJ7DvXox1e8K/Xov",
      region: "us-east-1",
      logging: true,
    });

    const [image, setImage]=React.useState({});
    const [files, setFiles] = React.useState([]);
    const[msg, setMes] = React.useState('');

    const FileChange = (e)=>{
        setImage(e.target.files[0] );
    }

    function FileUpload(){
        axios
          .post(
            "https://foz6gyq23d.execute-api.us-east-1.amazonaws.com/prod/upload",
            image
          )
          .then((res) => {
            console.log(res);
            const rmes=res.data;
            setmessageToDisplay(true);
            setErrmsg(false);
            setMes(rmes)
          })
          .catch((err) => {
            setmessageToDisplay(false);
            setErrmsg(true);
          });
    }
    

const fetchFilesFromS3 = async () => {
  try {
    const response = await s3
      .listObjectsV2({
        Bucket: "term-project-bucket",
      })
      .promise();
// console.log(response);
    const objects = response.Contents;
    const arrfiles=[];
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      
      const promise = await s3.getSignedUrlPromise("getObject", {
        Bucket: "term-project-bucket",
        Key: object.Key,
      });

      //  console.log("urls "+promise);
    
       arrfiles.push(promise);
    }
    setFiles(arrfiles);
    // setMes(rdata);
  } catch (error) {
    console.log(error);
  }
};

React.useEffect(() => {
  fetchFilesFromS3();
}, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <img src={clogo} alt="logo" className="logo" />
      <input
        style={{
          padding: "20px 40px",
          border: "2px dashed black ",
          margin: "10px 0",
        }}
        type="file"
        name="file"
        onChange={FileChange}
        accept="image/x-png,image/jpg,image/jpeg"
      ></input>
      <Button variant="contained" type="submit" onClick={FileUpload}>
        Upload
      </Button>
      {messageToDisplay && (
        <Alert severity="success" sx={{ my: 5 }}>
          <AlertTitle>Success</AlertTitle>
          {msg}
        </Alert>
      )}
      {errmessage && (
        <Alert severity="error" sx={{ my: 5 }}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong, <strong>please try again</strong>
        </Alert>
      )}
      <br />
      <div
        style={{
          width: "90%",
        }}
      >
        {files.map((file, index) => (
          <a
            onClick={() => {
              navigate("/details", {
                state: { file: file },
              });
            }}
            style={{ textDecoration: "none" }}
            key={index}
          >
            {" "}
            <img src={file} className="images-frame" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Upload;
