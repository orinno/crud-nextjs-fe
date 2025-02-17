import React from "react";
import { Grid, Box, Typography, Button, MenuItem } from "@mui/material";
import Link from "next/link";
 import { registerUser } from '@/app/authentication/auth/authController';
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import {useState} from 'react';
import { hashPassword } from "./auth";
//import { generateCustId } from "./idGenerator";
import { JSX } from "react/jsx-runtime";
import register from '../../../../pages/api/register';
import PassField from "@/app/Components/forms/theme-elements/PassField";

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
     const handleregister = async (event: React.FormEvent)=>{
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      //const userId = generateCustId(role);
      console.log('form data: ', {username, email, password});
      try{
        //const [showPassword, setShowPassword] = useState(false);
        const hashedPassword = await hashPassword(password);
        const response = await fetch('/api/register', {
          method : 'POST',
          headers : {'Content-Type': 'application/json'},
          body: JSON.stringify({username, email, password}),
        });

        const textData = await response.text();
        console.log('response dari server ', textData);

        if(!response.ok){
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = JSON.parse(textData);
        console.log('Data diterima di frontend', data);

        alert('registrasi berhasil')
      } catch (error){
        console.error('error di frontend', error);
        alert('registrasi gagal');
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

            {/* <Box component="form" onSubmit={handleregister}>*/}
      <Box component="form" onSubmit={handleregister}>
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
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField id="email" name="email" variant="outlined" fullWidth />

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
          <PassField type="password" id="password" name="password" fullWidth />
        </Stack>
        <Button
          /*color="primary"
          variant="container
          size="large"
          onClick={handleregister}
          fullWidth
          component={Link}
          href="/authentication/login"*/
          type="submit" color="primary" variant="contained" size="large" fullWidth
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;