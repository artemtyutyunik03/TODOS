import {useDispatch} from 'react-redux';
import {Box, AppBar, Toolbar, IconButton, Typography, Container, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {CustomSearch, SearchIconWrapper, StyledInputBase, UserSettingsMenu} from './ui';

import {toggleDrawerOpen} from '@entities/drawer/store';
import BasicModal from '@shared/components/modal';
import {CreateTodoForm} from '@pages/todos/components/';
import {Link} from 'react-router-dom';
import AddButtonIcon from '@shared/components/AddIcon';
import useVisable from '@shared/hooks/useVisable';


export default function Header() {
  const dispatch = useDispatch();
  const [isAddTaskModalOpen, openAddTaskModalOpen, closeAddTaskModalOpen] = useVisable(false);

  return (
    <Box sx={{flexGrow: 1}} position={'relative'}>
      <AppBar position="static" sx = {{boxShadow: 'none'}}>
        <Container >
          <Toolbar>
            <Tooltip title={'menu'}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => dispatch(toggleDrawerOpen())}
              >
                <MenuIcon sx={{marginTop: '-3px'}}/>
              </IconButton>
            </Tooltip>

            <Tooltip title={'home'}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{padding: '0 10px'}}
              >
                <Link to={'/'}>
                  <HomeIcon />
                </Link>
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{display: {xs: 'none', sm: 'block'}}}
            >
                            TODOS
            </Typography>

            <CustomSearch>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </CustomSearch>

            <Box sx={{flexGrow: 1}} />

            <Box sx={{display: {xs: 'none', md: 'flex'}, position: 'relative'}}>
              <Tooltip title={'add todo'}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={openAddTaskModalOpen}>
                  <AddButtonIcon color={'inherit'}/>
                </IconButton>
              </Tooltip>

              {/* modal window to add a new task*/}
              <BasicModal open={isAddTaskModalOpen}
                onClose={closeAddTaskModalOpen}>
                <CreateTodoForm onClose={closeAddTaskModalOpen}/>
              </BasicModal>

              <Tooltip title={'Your progress'}>
                <IconButton
                  size="large"
                  color="inherit"
                >
                  <CheckCircleOutlineIcon sx ={{marginRight: '5px'}}/>
                  <Typography>0/0</Typography>
                </IconButton>
              </Tooltip>
              <UserSettingsMenu/>

              <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <Tooltip title={'more'}>
                  <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
