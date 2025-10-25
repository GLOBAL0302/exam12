import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Card,
  formStyles,
  HeaderContainer,
  iconStyles,
  linkTextStyles,
  SignUpContainer,
  socialButtonsContainer,
  titleStyles,
} from './UserRegister.style';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import Link from '@mui/material/Link';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserLoginError, selectUserLoginLoading } from './UserSlice';
import { googleLoginThunk, logInThunk } from './userThunk';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
const initialState = {
  username: '',
  password: '',
};

const UserLogin = () => {
  const [loginForm, setLoginForm] = useState(initialState);
  const loginLoading = useAppSelector(selectUserLoginLoading);
  const loginError = useAppSelector(selectUserLoginError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(logInThunk(loginForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeRegisterForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          {loginError && <Alert severity="error">{loginError.error}</Alert>}
          <HeaderContainer>
            <Typography component="h4" variant="h5" sx={titleStyles}>
              Login
            </Typography>
            <FingerprintIcon style={iconStyles} />
          </HeaderContainer>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <FormControl>
              <FormLabel htmlFor="name">Username</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                autoComplete="username"
                name="username"
                fullWidth
                id="name"
                placeholder="Jon Snow"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                onChange={onChangeRegisterForm}
              />
            </FormControl>

            <Button loading={loginLoading} type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={socialButtonsContainer}>
            {loginLoading && <LinearProgress />}
            <Box component="div" className="w-full flex justify-center">
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
              <Link href="/register" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default UserLogin;
