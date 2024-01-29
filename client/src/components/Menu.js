import React from 'react'
import { styled } from 'styled-components'
import logo from '../img/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import HelpIcon from '@mui/icons-material/Help';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HistoryIcon from '@mui/icons-material/History';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Container = styled.div`
    flex: 1;
    flex-basis : 90px;
    background-color:${({ theme }) => theme.bg};
    height: 100vh;
    color : ${({ theme }) => theme.text};
    font-size : 14px;
    position : sticky;
    top : 0;
    overflow : scroll;
    &::-webkit-scrollbar {
        width: 0 ;
        height: 0;
    }
`;
const Wrapper = styled.div`
    padding : 18px 26px;
`;
const Logo = styled.div`
    display : flex;
    align-items : center;
    gap : 5px;
    font-weight : bold;
    margin-bottom : 15px;
    letter-spacing : 0.04rem;
`;
const Img = styled.img`
    height : 25px;
    border-radius : 8px;
`;

const Item = styled.div`
    display : flex;
    align-items : center;
    gap : 20px;
    cursor : pointer;
    padding : 5px 5px;
    &:hover {
        background-color : ${({ theme }) => theme.soft};
        border-radius : 3px;
        transition : 0.2s ease;
        transform : scale(1.1);
    }
`;

const Hr = styled.hr`
    margin : 15px 0px;
    border : 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
    text-align : left;
`
const Button = styled.button`
    padding : 8px 15px;
    background-color : transparent;
    border : 1px solid #3ea6ff;
    color : #3ea6ff;
    font-weight : 500;
    border-radius : 3px;
    margin-top : 10px;
    cursor : pointer;
    display : flex;
    align-items : center;
    gap : 5px;
`;

const Title = styled.h2`
    font-size : 14px;
    font-weight : 500;
    color : #aaaaaa;
    margin-bottom : 10px;
`;

const App = styled.p`
    background-color:${({ theme }) => theme.bg};
    color : ${({ theme }) => theme.text};
    
`;

const Menu = ({ darkMode, setMode }) => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                    <Logo>
                        <Img src={logo} />
                        <App>VideoTube</ App>
                    </Logo>
                </Link>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <HomeIcon /> Home
                    </Item>
                </Link>
                <Link to='trends' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <ExploreIcon /> Explore
                    </Item>
                </Link>
                {
                    currentUser && <Link to='sub' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Item>
                            <SubscriptionsIcon /> Subscriptions
                        </Item>
                    </Link>
                }
                <Hr />
                {
                    currentUser && <Link to='library' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Item>
                            <VideoLibraryIcon /> Library
                        </Item>
                    </Link>
                }
                {
                    currentUser && <Link to='history' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Item>
                            <HistoryIcon /> History
                        </Item>
                    </Link>
                }
                <Hr />
                {!currentUser &&
                    <>
                        <Login>
                            Sign in to like, comment, and subscribe videos.
                            <Link to='signin' style={{ textDecoration: 'none' }}>
                                <Button> <PersonIcon /> Sign In</ Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>
                }
                <Title>
                    BEST OF VIDEOTUBE
                </Title>
                <Link to='music' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <LibraryMusicIcon /> Music
                    </Item>
                </Link>
                <Link to='sports' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SportsCricketIcon /> Sports
                    </Item>
                </Link>
                <Link to='gaming' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SportsEsportsIcon /> Gaming
                    </Item>
                </Link>
                <Link to='movies' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <LocalMoviesIcon /> Movies
                    </Item>
                </Link>
                <Link to='news' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <NewspaperIcon /> News
                    </Item>
                </Link>
                <Link to='live' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <LiveTvIcon /> Live
                    </Item>
                </Link>
                <Hr />
                <Link to='setting' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <SettingsIcon /> Settings
                    </Item>
                </Link>
                <Link to='report' style={{ textDecoration: 'none', color: 'inherit' }}>

                    <Item>
                        <ReportIcon /> Report
                    </Item>
                </Link>
                <Link to='help' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Item>
                        <HelpIcon /> Help
                    </Item>
                </Link>
                <Item onClick={() => setMode(!darkMode)}>
                    <LightModeIcon /> {darkMode ? 'Light' : 'Dark'} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu
