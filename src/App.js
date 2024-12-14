import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import ProfileFriend from './pages/ProfileFriend/ProfileFriend';
import Chat from './pages/chat/Chat';
import Game from './pages/game/Game';
import Friends from './pages/friends/Friends';
import Settings from './pages/settings/Settings';
import Logout from './pages/logout/Logout';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signin/SignUp';
import Local from './pages/game/Local';
import Online from './pages/game/Online';
import SingleLocal from './pages/game/SingleLocal';
import TournamentLocal from './pages/game/TournamentLocal';
import Tournament from './pages/game/Tournament';
import Bot from './pages/game/PongGameBot';
import Adversaries from './pages/game/PongGameAdver';
import Score from './pages/game/Restart';
import { useAuth } from './context/AuthContext';
import Remote from './pages/game/RemoteGame';
import "./App.css"
import RemoteGame from './pages/game/RemoteGame';


function Layout(){
  const location = useLocation();
  const excludedPaths = [
    "/game/Local/SingleGame/SoloPractice",
    "/game/Local/SingleGame/SoloPractice/Score",
    "/game/Local/SingleGame/ChallengeAFriend",
    "/game/Local/SingleGame/ChallengeAFriend/Score",
    "/game/Local/TournamentLocal/Tournament",
  ];

  const excluded = excludedPaths.includes(location.pathname)
  //location.pathname: This is the current URL path from the useLocation hook provided by React Router. 
  //excludedPaths.includes(location.pathname) checks whether the location.pathname is exactly equal to any of the strings in the excludedPaths array.
  return (
    <>
      {!excluded && <Navbar/>}
      <div className="page-content">
      <Outlet/>
      </div>
    </>
  );
};

const App = () => {
const { islog } = useAuth(); // Get user from AuthContext

const loginRouter = createBrowserRouter([
  {
    path: "/",
    element: islog ? <Navigate to="/home" /> : <Outlet />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/signIn", element: <SignIn /> },
    ],
    errorElement: <Navigate to={"/"} />
  }
]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signUp", element: <Navigate to="/home" /> },
        { path: "/signIn", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/profile/:userId", element: <ProfileFriend /> },
        { path: "/chat", element: <Chat /> },
        { path: "/game", 
          children : [
            { path: "", element: <Game /> },
            { path: "Local", 
              children : [
                { path: "", element: <Local /> },
                { path: "SingleGame", 
                  children :[
                    { path: "", element: <SingleLocal /> },
                    { path: "SoloPractice", 
                      children:[
                        { path: "", element: <Bot /> },
                        { path: "Score", element: <Score /> },
                      ]
                     },
                    { path: "ChallengeAFriend", 
                    children:[
                      { path: "", element: <Adversaries /> },
                      { path: "Score", element: <Score /> },
                    ] },
                  ]
                 },

                { path: "TournamentLocal",
                  children :[
                    { path: "", element: <TournamentLocal /> },
                    { path: "Tournament", element: <Tournament /> },
                  ]},

            ] },
          { path: "/game/Online", 
              children : [
                { path: "", element: <RemoteGame /> },
          ] },
          ]
        },
        { path: "/friends", element: <Friends /> },
        { path: "/settings", element: <Settings /> },
        { path: "/logout", element: <Logout /> },
      ],
      errorElement: <Navigate to={"/home"} />
    },
  ]);

  return (
    <div className="app-container">
      <RouterProvider router={true ? router : loginRouter} /> 
    </div>
  );
};

export default App;

