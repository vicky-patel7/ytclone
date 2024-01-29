import React, { useState } from 'react';
import { styled } from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/Search';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Upload from './Upload';
import { logout } from '../redux/userSlice'

const Container = styled.div`
  position : sticky;
  top : 0;
  background-color : ${({ theme }) => theme.bg};
  height : 56px;
  width : 100%;
`;

const Wrapper = styled.div`
  display : flex;
  align-items : center;
  justify-content : flex-end;
  height : 100%;
  padding : 0px 20px;
  position : relative;
`;

const Search = styled.div`
  width : 50%;
  position : absolute;
  left : 0;
  right : 0;
  margin : auto;
  display : flex;
  align-items : center;
  justify-content : space-between;
  border : 1px solid #ccc;
  border-radius : 3px;
  height : 35px;
  color : ${({ theme }) => theme.text};
  `;

const Input = styled.input`
  border : none;
  background-color : transparent;
  height : 100%;
  width : 100%;
  font-size : 18px;
  color : ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding : 6px 12px;
  background-color : transparent;
  border : 1px solid #3ea6ff;
  color : #3ea6ff;
  font-weight : 500;
  border-radius : 7px;
  cursor : pointer;
  display : flex;
  align-items : center;
  gap : 5px;
`;

const User = styled.div`
  display : flex;
  align-items : center;
  gap : 10px;
  font-weight : 500;
  color : ${({ theme }) => theme.text};
  &:hover{
    cursor : pointer;
  }
`

const Avatar = styled.img`
  width : 32px;
  height : 32px;
  border-radius : 50%;
  background-color : #999;
`

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder='Search...' onChange={e => setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              <LogoutTwoToneIcon onClick={() => dispatch(logout())} />
            </User>
          ) : (
            <Link to='signin' style={{ textDecoration: 'none' }}>
              <Button>
                <PersonIcon />Sign In
              </Button>
            </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar
