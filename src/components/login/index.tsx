import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reset, setAuthenticated } from '../../store/authReducer';
import ContentWrapper from '../global/ContentWrapper';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../store/api';
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Loader, PrimaryLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  const [payload, setPayload] = useState({
    email: '',
    password: '',
    role: 'CUSTOMER',
  });
  const [error, setError] = useState({ status: false, msg: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postLoginResponse = useMutation(login(payload));

  const handleLoginCredentials = () => {
    dispatch(
      setAuthenticated({
        isLoggedIn: true,
        user: postLoginResponse?.data?.userDetail?.email,
        stage: 'AUTHENTICATED',
        userId: postLoginResponse?.data?.userDetail?._id,
      })
    );
    navigate('/');
  };

  if (postLoginResponse.isSuccess) {
    let token = localStorage.getItem('token');
    token =
      token?.trim().replace(`"`, '').split(' ')?.[1]?.replace(`"`, '') || '';
    if (!Boolean(token) || token === 'undefined')
      localStorage.setItem('token', `Bearer ${postLoginResponse.data.token}`);
    handleLoginCredentials();
  }

  const handleLogin = async () => {
    postLoginResponse.mutate();
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    token =
      token?.trim().replace(`"`, '').split(' ')?.[1]?.replace(`"`, '') || '';
    if (Boolean(token) && token !== 'undefined') postLoginResponse.mutate();
    if (token === 'undefined') {
      localStorage.removeItem('token');
      dispatch(reset());
    }
  }, []);

  if (postLoginResponse.isLoading) {
    return (
      <Box margin='auto'>
        <Box src={Loader} component='img' alt='loading' />
      </Box>
    );
  }

  if (postLoginResponse.isError) {
    localStorage.removeItem('token');
    dispatch(reset());
    setError({ status: true, msg: JSON.stringify(postLoginResponse.error) });
  }

  return (
    <ContentWrapper>
      <div> Login Page</div>
      {error.status && <Alert severity='error'>{error.msg}</Alert>}
      <Box display='flex' columnGap='24px' justifyContent='space-between'>
        {isTablet && (
          <Box
            component='img'
            src={PrimaryLogo}
            alt='login-image'
            maxWidth='50%'
          />
        )}
        <Box>
          <Box marginBottom='32px'>
            <Typography fontSize='36px'>Welcome to the </Typography>
            <Typography fontSize='40px' fontWeight='700' color={'#6358DC'}>
              AMAZING PROJECT
            </Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            rowGap='24px'
            width='100%'
            margin='auto'
          >
            <TextField
              label='Email id'
              variant='standard'
              value={payload.email}
              onChange={(e) =>
                setPayload((old) => ({ ...old, email: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label='Password'
              variant='standard'
              value={payload.password}
              onChange={(e) =>
                setPayload((old) => ({ ...old, password: e.target.value }))
              }
              fullWidth
            />
            <Button onClick={() => handleLogin()} variant='contained'>
              Submit
            </Button>
            <Button onClick={() => navigate('/signup')} variant='outlined'>
              SignUp
            </Button>
          </Box>
        </Box>
      </Box>
      <Alert severity='info'>
        Dummy login credentials - email : abc@abc.com , password : test1
      </Alert>
    </ContentWrapper>
  );
};

export default Login;
