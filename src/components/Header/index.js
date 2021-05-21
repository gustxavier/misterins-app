// import React, { useState } from 'react';
// import clsx from 'clsx';
// import { useHistory } from 'react-router-dom';
// import { FiPower } from 'react-icons/fi';
// import { AppBar, Button, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import { makeStyles } from '@material-ui/core/styles';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import './style.css'

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   hide: {
//     display: 'none',
//   },
// }));

// export default function Header() {
//   const [token] = useState(localStorage.getItem('token'));
//   const [username] = useState(localStorage.getItem('username'));
//   const [open, setOpen] = React.useState(false);
//   const history = useHistory();

//   if (token === '' || token === null) {
//     history.push('/');
//   }

//   function handleLogout() {
//     localStorage.clear();
//     history.push('/');
//   }

//   function handleAffiliate() {
//     window.open('https://app-vlc.hotmart.com/affiliate-recruiting/view/2201V44551760')
//   }

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const classes = useStyles();

//   return (
//     <div className="header">
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, {
//               [classes.hide]: open,
//             })}
//           >
//             <MenuIcon />
//           </IconButton>
//           <span className="menuTitle"></span>
//           {/* <Link to="/socio" className="menuTitle">
//             <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="mister-ins" />
//           </Link> */}
//           {/* {localStorage.getItem('permission') !== 'admin' && */}
//           <Button
//             title="Seja um afiliado Mister Ins"
//             className="affiliate-button"
//             onClick={handleAffiliate}
//           ><ThumbUpAltIcon></ThumbUpAltIcon> Seja um Afiliado</Button>
//           {/* } */}
//           <Tooltip title="Desconectar">
//             <button className="menuButton" onClick={handleLogout} type="button">
//               <Typography title="sair">{username}</Typography><FiPower size={16} color="#fff" />
//             </button>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { AppBar, Button, Toolbar, Tooltip, Typography } from '@material-ui/core';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './style.css'

export default function Header() {
  const [token] = useState(localStorage.getItem('token'));
  const [username] = useState(localStorage.getItem('username'));
  const history = useHistory();

  if (token === '' || token === null) {
    history.push('/');
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function handleAffiliate() {
    window.open('https://app-vlc.hotmart.com/affiliate-recruiting/view/2201V44551760')
  }

  return (
    <div className="header">
      <AppBar className="menu" position="static">
        <Toolbar>
          <Link to="/socio" className="menuTitle">
            <img src="https://misterins.com.br/wp-content/themes/misterins/assets/images/logo.png" alt="mister-ins" />
          </Link>
          {/* {localStorage.getItem('permission') === 'admin' &&
            <Link className="link" color="secondary" to="/admin">
              Administração
          </Link>
          } */}
          {localStorage.getItem('permission') === 'admin' &&
            <Link
              variant="contained"
              color="secondary"
              title="Assistir Live"
              className="link"
              to="/lives"
            >
              Assistir Live
            </Link>
          }
          {localStorage.getItem('permission') !== 'admin' &&
            <Button
              title="Seja um afiliado Mister Ins"
              className="affiliate-button"
              onClick={handleAffiliate}
            ><ThumbUpAltIcon></ThumbUpAltIcon> Seja um Afiliado</Button>
          }
          <Tooltip title="Desconectar">
            <button className="menuButton" onClick={handleLogout} type="button">
              <Typography title="sair">{username}</Typography><FiPower size={16} color="#fff" />
            </button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}