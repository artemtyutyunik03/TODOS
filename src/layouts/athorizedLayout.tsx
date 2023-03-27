import {Box} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import Routing from '@pages/routes';
import {ToastContainer} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import Drawer from '@entities/drawer';

const gridItemStyles = (isDrawerOpen: boolean) => ({
  height: '100%',
  overflow: 'scroll',
  maxHeight: 'calc(100vh - 56px)',
  padding: '0',
  paddingTop: '0 !important',
  marginLeft: {largeMobile: 0, tablet: isDrawerOpen ? '270px' : 0, laptop: isDrawerOpen ? '350px' : 0},
  position: 'relative',
})

const AuthorizedLayout= () => {
  const {isOpenDrawer} = useSelector((state: RootReducer) => state.drawerReducer);
  return (
    <>
      <Box sx={{marginTop: 0}} height={'calc(100vh - 56px)'}>
        <Box paddingTop={'0 !important'}
          position={'absolute'}
          height={'calc(100vh - 56px)'}
          display={isOpenDrawer ? 'block' : 'none'}>
          <Drawer/>
        </Box>
        <Box sx={gridItemStyles(isOpenDrawer)}>
          <Box width={{mobile: '100%', largeMobile: '80%'}}
            margin={{mobile: '0', largeMobile: '0 auto'}}
            padding={{mobile: '0 20px', largeMobile: 0}}>
            <Routing/>
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </>
  );
};

export default AuthorizedLayout;
