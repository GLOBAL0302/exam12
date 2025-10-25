import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import type { IUserFields } from '../../types';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../../app/hooks';

import { Link } from 'react-router-dom';
import { apiUrl } from '../../GlobalConstant';
import { logOutThunk } from '../../features/users/userThunk';

type IProps = {
  user: IUserFields;
};

const CurrentUser: React.FC<IProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let image;

  if (user.avatar && (/^images/.test(user.avatar) || /^fixtures/.test(user.avatar))) {
    image = apiUrl + '/' + user.avatar;
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt="Remy Sharp" src={image ? image : user.avatar} className="mr-3" />{' '}
        <Typography component="p" variant="body1" color="white">
          {user.displayName}
        </Typography>
      </Button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/myMeals">My Meals</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/addMeals">Add Meals</Link>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logOutThunk())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default CurrentUser;
