import axios from 'axios';
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../src/firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    height : calc(100vh - 56px);
    color : ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    height : calc(100vh - 56px);
    width : 300px;
    background-color : ${({ theme }) => theme.bgLighter};
    padding : 20px 50px;
    border : 1px solid ${({ theme }) => theme.soft};
    gap : 8px;
    border-radius : 5px;
`;

const Title = styled.h1`
    font-size : 24px;
`;

const SubTitle = styled.h2`
    font-size : 18px;
    font-weight : 300;
`;

const Input = styled.input`
    border : 1px solid ${({ theme }) => theme.soft};
    border-radius : 3px;
    padding : 8px;
    background-color : transparent;
    width : 100%;
    color : ${({ theme }) => theme.text};
`;

const Button = styled.button`
    border-radius : 3px;
    border : none;
    padding : 10px 20px;
    font-weight : 500;
    cursor : pointer;
    background-color : ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
    display : flex;
    font-size : 10px;
    margin-top : 10px;
    color : ${({ theme }) => theme.soft};
`;

const Links = styled.div`
    margin-left : 50px;
`;

const Link = styled.span`
    margin-left : 30px;
`;

const baseUrl = process.env.REACT_APP_URL;
const SignIn = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post(`${baseUrl}/auth/signin`, { email, password });
            dispatch(loginSuccess(res.data));
            navigate('/');
        } catch (err) {
            dispatch(loginFailure(err.message));
        }
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/auth/signup`, { name, email, password });
            console.log(res);
            navigate('/')
        } catch (err) {
            console.log(err);

        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
        .then((result) => {
            axios.post(`${baseUrl}/auth/google`, {
                name : result.user.displayName,
                email : result.user.email,
                img : result.user.photoURL
            }).then((res) => {
                dispatch(loginSuccess(res.data));
                navigate('/')
            })
        }).catch((error)=> {
            dispatch(loginFailure(error.message));
        })
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to Contnue to VideoTube</SubTitle>
                <Input placeholder='Email' name='email' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='Password' name='password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>
                <Button onClick={signInWithGoogle}>Signin With Google</Button>
                <Title>Or</Title>
                <Input placeholder='Username' name='name' onChange={e => setName(e.target.value)} />
                <Input placeholder='Email' name='email' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='password' name='password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleSignUp}>Sign Up</Button>
            </Wrapper>
            <More>
                English (IND)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn
