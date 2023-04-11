import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, Button, Chip, Container, Slider, Typography } from '@mui/material';
import './details.css'



function Details() {
        let navigate = useNavigate();
        let incomingData = useLocation();
        const [labels, setLabels] = React.useState([]);
        const [svalue, setSvalue] = React.useState(80);

          const valuetext = (event, value) => {
            setSvalue(value);
          };

        const fileurl=incomingData.state.file;
        const dataToSend = {
          url : fileurl,
          slider : svalue
        }
        
        const lambda = async (event) => {
           axios.post("https://x6hqms7ftqagukykvzw4o35uoe0fptzp.lambda-url.us-east-1.on.aws/",
           dataToSend)
           .then((res) => {
               console.log(res.data);
               const arrlabels = [];
               const objects=res.data.body.Labels
                for (let i = 0; i < objects.length; i++) {
               console.log(res.data.body.Labels[i].Name)
               const lname = res.data.body.Labels[i].Name;
               arrlabels.push(lname);
               
                }

                setLabels(arrlabels);
                // console.log(labels);
             })
             .catch((error) => {
               console.log(error);
             });
         };
        
  return (
    <Container>
      <div className="grid-container2">
        <div className="grid-item grid-item-01">
          <img src={fileurl} className="image-display"></img>
        </div>
        <div className="grid-item grid-item-02">
          <Box sx={{ width: "300px" }}>
            <Typography gutterBottom>
              Set min. confidence level: <b>{svalue}</b>
            </Typography>
            <Slider
              aria-label="Confidence"
              defaultValue={80}
              onChange={valuetext}
              valueLabelDisplay="auto"
              min={50}
              max={100}
            />
          </Box>

          <Button onClick={lambda} variant="contained" sx={{ my: 2 }}>
            Execute
          </Button>
          <br />

          {labels.map((label, index) => {
            return (
              <Chip label={label} variant="outlined" sx={{ ml: 1, mt: 1 }} />
            );
          })}
        </div>
      </div>
      <Button
        sx={{ m: "auto", mt: 5 }}
        onClick={() => {
          navigate("/home");
        }}
      >
        Go Back
      </Button>
    </Container>
  );
}

export default Details
