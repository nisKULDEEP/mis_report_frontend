import { createTheme } from '@mui/material';

const tablet = '@media (min-width: 900px)';

const desktop = '@media (min-width: 1024px)';

const tabletMui = '(min-width: 768px)';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300, // phone
      sm: 768, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});

export { tablet, desktop, tabletMui, theme };
