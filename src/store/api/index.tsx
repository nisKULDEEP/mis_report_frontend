import React from 'react';
import { BASE_URL } from '../../utils/constants';

export const login = (props: { email: string; password: string }) => {
  return () =>
    fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(Boolean(JSON.stringify(localStorage.getItem('token'))) && {
          token: JSON.stringify(localStorage.getItem('token') || ''),
        }),
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
      }),
    }).then((response) => response.json());
};

export const signup = (props: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return () =>
    fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        confirmPassword: props.confirmPassword,
      }),
    });
};

export const logout = (props: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return () =>
    fetch(`${BASE_URL}/users/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: JSON.stringify(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        confirmPassword: props.confirmPassword,
      }),
    });
};

export const tableApi = (props: {
  page: number;
  limit: number;
  report_type: string;
}) => {
  return () =>
    fetch(
      `${BASE_URL}/report/all?page=${props.page}&limit=${props.limit}&report_type=${props.report_type}`,
      {
        headers: {
          'Content-Type': 'application/json',
          token: JSON.stringify(localStorage.getItem('token')),
        },
      }
    ).then((res) => res.json());
};
