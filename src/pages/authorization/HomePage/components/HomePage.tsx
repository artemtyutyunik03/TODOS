import React from 'react';
import {Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import SignUpButton from '@pages/authorization/HomePage/components/SignUpButton';
import AppLogo from '@shared/components/AppLogo';

const HomePage = () => {
  return (
    <Box>
      {/* Header*/}
      <Box sx={headerStyles}>
        <Box sx={containerStyles} justifyContent={'space-between'}>
          <AppLogo sx={logoStyles}/>
          <Box display={'flex'} alignItems={'center'}>
            <Typography sx={signInLink}>
              <Link to={'/login'}>
                Sign in
              </Link>
            </Typography>
            <SignUpButton/>
          </Box>
        </Box>
      </Box>

      <Box sx={titleSection}>
        <Typography component={'h1'} sx={pageTitle}>
          Organize Your Life
        </Typography>

        <Typography fontFamily={'JetBrains Mono'}
          fontSize={'20px'}
          letterSpacing={'0.1em'}
          lineHeight={'1.2'}
          fontWeight={500}
          maxWidth={'500px'}
          margin={'10px auto'}>
          We will help you keep your mind clear and free from procrastination
        </Typography>
        <SignUpButton/>
      </Box>

      <Box sx={containerStyles} justifyContent={'center'}>
        <Box sx={phoneImage}></Box>
        <Box maxWidth={'35%'}>
          <Typography sx={appDescription} marginBottom={'20px'}>
            <span>TODOS</span> is your ultimate tool for staying organized and productive. With our app, you can easily manage your tasks, set priorities, and never miss a deadline.<br/>
          </Typography>
          <Typography sx={appDescription}>
            Boost your productivity and conquer your goals with our intuitive and feature-rich Todo App. Try it today and experience the joy of efficient task management.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const headerStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: '80px',
  background: 'rgba(255, 249, 249, 0.27)',
}

const containerStyles = {
  width: '1300px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
}

const logoStyles = {
  color: ' #1976D2',
  fontSize: '25px',
  fontFamily: 'JetBrains Mono',
  fontWeight: 700,
}

const signInLink = {
  'fontSize': '17px',
  'color': '#232115',
  'fontWeight': 500,
  'fontFamily': 'Inter',
  'padding': '3px 12px',
  'cursor': 'pointer',
  'borderRadius': '7px',
  '&: hover': {
    background: 'hsla(53,10%,69%,.2)',
  },
}

const titleSection = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '70px',
  marginBottom: '35px',
  width: '100%',
  height: 'fit-content',
  textAlign: 'center',
}

const pageTitle = {
  'fontWeight': 700,
  'fontSize': '27px',
  'fontFamily': 'JetBrains Mono',
  'background': '-webkit-linear-gradient(90deg, rgba(40,128,214,1) 41%, rgba(18,174,236,1) 56%, rgba(30,149,224,1) 84%)',
  'WebkitBackgroundClip': 'text',
  'WebkitTextFillColor': 'transparent',
}

const phoneImage = {
  height: '350px',
  width: '30%',
  backgroundImage: `url('/iphone-12--black 1.png')`,
  backgroundSize: 'contain',
  backgroundPosition: 'left',
  backgroundRepeat: 'no-repeat',
}

const appDescription = {
  'lineHeight': '150.6%',
  'fontSize': '20px',
  'fontFamily': 'JetBrains Mono',
  '& span': {
    color: '#1976D2',
  },
  '& br': {
    marginBottom: '10px',
  },
}


export default HomePage;
