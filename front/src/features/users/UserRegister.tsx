import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoMdLogIn } from 'react-icons/io';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {
  Card,
  SignUpContainer,
  VisuallyHiddenInput,
  HeaderContainer,
  titleStyles,
  iconStyles,
  formStyles,
  socialButtonsContainer,
  linkTextStyles,
} from './UserRegister.style';
import type { IUserRegisterMuation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { googleLoginThunk, signInThunk } from './userThunk';
import { selectUserLoginLoading, selectUserSignInError, selectUserSignInLoading, unSetSignInError } from './userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import LinearProgress from '@mui/material/LinearProgress';

const initialState: IUserRegisterMuation = {
  username: '',
  password: '',
  displayName: '',
  avatar: null,
  mail: '',
};

const UserRegister = () => {
  const [registerForm, setRegisterForm] = React.useState(initialState);
  const dispatch = useAppDispatch();
  const userSignInLoading = useAppSelector(selectUserSignInLoading);
  const userSignInError = useAppSelector(selectUserSignInError);
  const userLoginLoading = useAppSelector(selectUserLoginLoading);
  const navigate = useNavigate();
  const location = useLocation();

  const getError = (name: string) => {
    try {
      return userSignInError?.errors[name].message;
    } catch (e) {
      return;
    }
  };

  React.useEffect(() => {
    dispatch(unSetSignInError());
  }, [location]);

  const onChangeRegisterForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userSignInError?.errors);
    try {
      await dispatch(signInThunk(registerForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setRegisterForm((prevState) => ({
        ...prevState,
        avatar: files[0],
      }));
    }
  };

  const googleLogin = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        await dispatch(googleLoginThunk(credentialResponse.credential)).unwrap();
        navigate('/');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <HeaderContainer>
            <Typography component="h4" variant="h5" sx={titleStyles}>
              Sign up
            </Typography>
            <IoMdLogIn style={iconStyles} />
          </HeaderContainer>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                value={registerForm.username}
                autoComplete="username"
                name="username"
                fullWidth
                id="name"
                placeholder="Jon Snow"
                helperText={getError('username')}
                error={Boolean(getError('username'))}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                value={registerForm.password}
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                helperText={getError('password')}
                error={Boolean(getError('password'))}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Display Name</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                value={registerForm.displayName}
                fullWidth
                id="displayName"
                placeholder="Jonnatan"
                name="displayName"
                autoComplete="email"
                variant="outlined"
                helperText={getError('displayName')}
                error={Boolean(getError('displayName'))}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Mail</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                value={registerForm.mail}
                fullWidth
                id="mail"
                placeholder="your@mail.com"
                name="mail"
                autoComplete="mail"
                variant="outlined"
                helperText={getError('mail')}
                error={Boolean(getError('mail'))}
              />
            </FormControl>
            <Button
              color={registerForm.avatar ? 'success' : 'primary'}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={registerForm.avatar ? <CloudDownloadIcon /> : <CloudUploadIcon />}
            >
              {registerForm.avatar ? registerForm.avatar.name.slice(1, 5) + '...' : 'Upload File'}

              <VisuallyHiddenInput type="file" onChange={changeFile} multiple />
            </Button>
            <Button loading={userSignInLoading} type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={socialButtonsContainer}>
            {userLoginLoading && <LinearProgress />}
            <Box component="div" className={`w-full flex justify-center ${userLoginLoading && 'hidden'}`}>
              <GoogleLogin
                theme="filled_blue"
                shape="pill"
                onSuccess={googleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </Box>
            <Typography sx={linkTextStyles}>
              Already have an account?{' '}
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default UserRegister;
