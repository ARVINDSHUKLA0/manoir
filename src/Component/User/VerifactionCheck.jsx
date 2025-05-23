import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { resendVerifyMail, userVerifyCheck } from '../../Api/api'; 
import bannerImg from '/assets/img/imofficial.jpeg'

const defaultTheme = createTheme();



const VerifactionCheck = ()=>{ 
    const [verifyCheck, setVerifyCheck] = useState()
    const {id} = useParams() 
    const navigate = useNavigate()


    const resendmail = (id)=>{
        resendVerifyMail(id)
        checkfunc(id)
    }

    const checkfunc = async (id)=>{
        const data = await userVerifyCheck(id) 
        setVerifyCheck(data) 
        console.log(data);
        if(data.isVerify){
            navigate('/login')
        }
        console.log(verifyCheck); 
    }
    useEffect(()=>{ 
        checkfunc(id)
    }, []) 
  return (
    <>
    {verifyCheck && !(verifyCheck.isVerify) ?
    <section className="overflow-hidden">
        <div className="row min-vh-100">
            <div className="col-md-6 col-12 sm-none">
                <div className='h-100'>
                    <img src={bannerImg} className='overflow-hidden h-100 '  alt="doozie do" />
                </div>
            </div>
            <div className="col-md-6 col-12 bg-white ">
                <div className='h-100 d-flex align-items-center'>  
                <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs" className='main-side-form'>
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 4,
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                    }}
                    > 
                        <h3>Verification Status : <span className='text-warning'>Pending</span></h3>
                        <p>Please go to the your email and please verify your account</p>
                        <button className='btn btn-primary' onClick={e=>resendmail(id)}>Resend </button>
                    </Box> 
                </Container>
                </ThemeProvider>   
                </div>
            </div>
        </div>
    </section> : null }
    </>
  );
}

export default VerifactionCheck
