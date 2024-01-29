import { ThemeProvider, styled } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import './App.css';
import { darkTheme, lightTheme } from './utils/Theme';
import Home from './pages/Home';
import BestOfHome from './pages/BestOfHome';
import Video from './pages/Video';
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import Setting from './pages/Setting';
import Report from './pages/Report';
import Help from './pages/Help';


const Container = styled.div`
  display : flex;
`;

const Main = styled.div`
  flex : 7;
  background-color : ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding : 12px 8px;
`;

function App() {

  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/' >
                  <Route index element={<Home type="random" />} />
                  <Route path='trends' element={<Home type="trend" />} />
                  <Route path='sub' element={<Home type="sub" />} />
                  <Route path='library' element={<BestOfHome type="library" />} />
                  <Route path='history' element={<BestOfHome type="history" />} />
                  <Route path='search' element={<Search />} />
                  <Route path='signin' element={<SignIn />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                  <Route path='music' element={<BestOfHome type="music" />} />
                  <Route path='sports' element={<BestOfHome type="sports" />} />
                  <Route path='gaming' element={<BestOfHome type="gaming" />} />
                  <Route path='movies' element={<BestOfHome type="movies" />} />
                  <Route path='news' element={<BestOfHome type="news" />} />
                  <Route path='live' element={<BestOfHome type="live" />} />
                  <Route path='setting' element={<Setting darkMode = {darkMode} setMode = {setDarkMode} type="setting" />} />
                  <Route path='report' element={<Report type="report" />} />
                  <Route path='help' element={<Help type="help" />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
