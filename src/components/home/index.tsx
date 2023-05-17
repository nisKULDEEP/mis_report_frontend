import React, { useEffect } from 'react';
import Header from '../global/Header';
import Table from '../table';
import ContentWrapper from '../global/ContentWrapper';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../store/authReducer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isUserLoggedIn = useSelector(selectLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) navigate('/login');
  }, [isUserLoggedIn]);

  return (
    <ContentWrapper>
      <Header />
      <Table />
    </ContentWrapper>
  );
};
export default Home;
