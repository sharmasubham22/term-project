import { Button, Container, Typography } from '@mui/material';
import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  state={
    selectedFile:null,
    fileUploadedSuccessfully: false
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]})
  }

  onFileUpload = event => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    formData.append('image',this.state.selectedFile)
    //call api
    axios
      .post(
        "https://foz6gyq23d.execute-api.us-east-1.amazonaws.com/prod/upload",
        formData
      )
      .then(() => {
        this.setState({ selectedFile: null });
        this.setState({ fileUploadedSuccessfully: true });
      });
  }

  fileData = () => {
    if (this.state.selectedFile){
      return (
        <div>
          <Typography sx={{ pt: 3 }}>
            File Name: {this.state.selectedFile.name}
          </Typography>
          <Typography>File Name: {this.state.selectedFile.type}</Typography>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully){
      return (
        <div>
          <Typography sx={{ py: 3 , color:"green"}}>File uploaded successfully</Typography>
        </div>
      );
    } else{
      return(
        <div>
          <Typography sx={{py:3}}>Choose a file and then click on upload button.</Typography>
        </div>
      )
    }
  }

  render(){
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
      }}
    >
      <Typography variant='h5'>Upload an image or choose</Typography>

      <input style={{padding:"10px 10px", border: "2px dashed black ", margin:"10px 0"}} type="file" onChange={this.onFileChange}></input>
      <Button variant="contained" onClick={this.onFileUpload}>Upload</Button>
      {this.fileData()}
    </Container>
  );}
}

export default Home;
