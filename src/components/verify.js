import { Container, Typography, Link } from '@mui/material';
import EmailIcon from "@mui/icons-material/Email";
import React from 'react'

function Verify() {
  return (
    <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", py:20}}>
        <EmailIcon sx={{fontSize:"94px"}}/>
      <Typography>Please check your mail and verify the link</Typography>
      <Link href="/login" variant="body2">
        Click here to Sign in
      </Link>
    </Container>
  );
}

export default Verify;
