import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LiaCocktailSolid } from 'react-icons/lia';
import { useAppSelector } from '../../app/hooks';

import CurrentUser from './CurrentUser';
import Incognito from './Incognito';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/users/UserSlice';

const AppBarComponent = () => {
  const user = useAppSelector(selectUser);
  return (
    <div>
      <AppBar position="static" className="mb-4">
        <Toolbar variant="dense" className="flex justify-around bg-black">
          <Link to="/">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <LiaCocktailSolid />
              <Typography component="p" variant="body1">
                Cocktail
              </Typography>
            </IconButton>
          </Link>
          {user ? <CurrentUser user={user} /> : <Incognito />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
