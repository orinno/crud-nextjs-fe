/*import React, { useRef } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import Link from "next/link";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { JSX } from 'react/jsx-runtime';
import { PasswordRounded } from '@mui/icons-material';
import {loginUser} from '../auth/authController';
//import loginhandler from '../../../../pages/api/login';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}
const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const username = (event.currentTarget.elements.namedItem('username') as HTMLInputElement);
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement);
    console.log('form data: ', {username, password});

    try{

      const response = await fetch('api/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username, password}),
      });

      const textData = await response.text();
      console.log('response dari server', textData);

      if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(textData);
      console.log('Data diterima di frontend', data);
      alert('login berhasil');
    } catch(error) {
      console.error('error di frontend', error);
      alert('login gagal yhahah')
    }
  }
  

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}


        <Box component="form" onSubmit={handleSignIn}>
          <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField variant="outlined" id="username" name="username" fullWidth />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          //component={Link}
          //href="/tabData"
          type="submit"
        >
          Sign In
        </Button>

      </Box>
      </Stack>
      {subtitle}
    </>
  );
};
export default AuthLogin;*/


import React from "react";
import {Box, Typography, Button} from "@mui/material";
import Link from "next/link";
import {loginUser} from '@/app/authentication/auth/authController';
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {Stack} from "@mui/system";
import {JSX} from "react/jsx-runtime";
import login from '../../../../pages/api/login';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import PassField from "@/app/Components/forms/theme-elements/PassField";
import {comparePassword} from './auth';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({title, subtitle, subtext} : loginType) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    console.log('form data:', {username, password});
  
  try{
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({username, password})
    });

    if(!response.ok){
      throw new Error(`error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if(result.success){
      /*alert(`Welcome ${result.user.name}`);
      router.push('/dashboard')*/
      const user = result.user;
      const isPasswordMatch = await comparePassword(password, user.hashPassword);

      if (isPasswordMatch) {
        alert(`Welcome ${user.name}`);
        router.push('/dashboard');
      } else {
        alert('Login gagal: Password tidak sesuai');
      }
    } else {
      alert(`login gagal: ${result.message || result.error}`);
    }

    /*const textData = await response.text();
    console.log('response dari servernya kayak gini', textData);

    const data = JSON.parse(textData);
    console.log('data diterima di frontend', data);*/
  } catch (error){
    console.error('error di frontend', error);
    alert('login gagal')
  }
  }


  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ): null}

      {subtext}
      <Box component="form" onSubmit={handleSignIn}>
      <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
            >
              Name
          </Typography>
          <CustomTextField id="username" name="username" variant="outlined" fullWidth />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <PassField type="password" id="password" name="password"/>
        </Stack>
        <Button
          /*color="primary"
          variant="contained"
          size="large"
          onClick={handleregister}
          fullWidth
          component={Link}
          href="/authentication/login"*/
          type="submit" color="primary" variant="contained" size="large" fullWidth
        >
          Sign in
        </Button>
      </Box>
      {subtitle}
    </>
    );
};

export default AuthLogin