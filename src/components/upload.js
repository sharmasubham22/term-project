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
      accessKeyId: "ASIAUHDWUCHJI2QZNPE3",
      secretAccessKey: "rvRRCZQcKMmZjIwSnY2Ptux2ivwrVs0sMfw/DZeL",
      sessionToken:
        "FwoGZXIvYXdzEPH//////////wEaDKtv2xO3SP4Sz9vtUiLAASLKKzSRjFxh9kLrY+29YuhfX/W16LaK3ldnuGI1QWvOvpyKUa8TE0XK8zHTRWpchWhKpGevqIwmtc/7vzXYRvKBrb1ugOkr6lTT/C71yue6QFcMRfHgxC1nH6A4SSm2Gm5+IcXMLJfxbaRjVsZh1OMgVw9w0hZ+qEiAPV3fGRAYI5xDkZGrcOE85ZGlgCquheNfs6ho/+gXvhrEyCeeNOmbvgqroo0Vz+2FERAgdOxdU+kspc3ftZJyBvV3UV10LCiEhd2hBjItiME4zDRmeg3DNx+PPQIzNjnc4xGhRhNpsdrVkvJNTvbvTnL6w6kI5DMWzxUp",
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
  // fetchFilesFromS3();
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
      <Button variant="contained" type="submit" sx={{mt:2}} onClick={fetchFilesFromS3}>
        Get Images
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
