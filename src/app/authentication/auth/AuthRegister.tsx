import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
// import { registerUser } from './authController';
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";
import { JSX } from "react/jsx-runtime";

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    // const handleSignUp = async () => {
    //     const nameInput = document.getElementById('name') as HTMLInputElement || null;
    //     const emailInput = document.getElementById('email') as HTMLInputElement || null;
    //     const passwordInput = document.getElementById('password') as HTMLInputElement || null;

    //     if(!nameInput||!emailInput||!passwordInput){
    //         alert('isi semuanya dong biar akunnya kebikin');
    //         return;
    //     }

    //     const name = nameInput.value;
    //     const email = emailInput.value;
    //     const password = passwordInput.value;

    //     try{
    //         const response = await fetch('/api/auth/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type' : 'application/json',
    //             },
    //             body: JSON.stringify({name, email, password}),
    //     });

    //     const result = await response.json();
    //     if (result.success){
    //         alert('regis berhasil');
    //     } else {
    //         alert('error: ${result.error}');
    //     }
    // } catch (error){
    //     alert('ada trouble icibos')
    // }
    // }
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            {/* <Box component="form" onSubmit={handleSignUp}> */}
            <Box component="form">
                <Stack mb={3}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="name"
                        mb="5px"
                    >
                        Name
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth />

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
          <CustomTextField id="email" variant="outlined" fullWidth />

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
          <CustomTextField id="password" variant="outlined" fullWidth />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/authentication/login"
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;