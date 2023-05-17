import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      maxWidth='1104px'
      margin='auto'
      display='flex'
      flexDirection='column'
      gap={isTablet ? '80px' : '40px'}
      padding={isTablet ? '24px' : '16px'}
      {...rest}
    >
      {children}
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
