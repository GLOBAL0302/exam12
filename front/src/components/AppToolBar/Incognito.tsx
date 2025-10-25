import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Incognito = () => {
  return (
    <Box component="div" className="flex space-x-2">
      <Button color="inherit" variant="outlined">
        <Link to="login">Login</Link>
      </Button>
      <Button color="inherit" variant="outlined">
        <Link to="register">Sign in</Link>
      </Button>
    </Box>
  );
};

export default Incognito;
