import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display : flex;
    align-items : center;
    justify-content : center;
    scrollY : none;   
`
const Wrapper = styled.div`
    width: 90%;
    height : 700px;
    background-color: ${({ theme }) => theme.bgLighter};
    color : ${({ theme }) => theme.text};
    padding : 20px;
    display : flex;
    flex-direction : column;
    gap : 20px;
    position : relative;
    border-radius : 12px;
`
const Close = styled.div`
    position : absolute;
    top : 10px;
    right : 10px;
    cursor : pointer;
`
const Title = styled.h1`
    text-align : center;
`

const Input = styled.input`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background-color : transparent;
`

const Desc = styled.textarea`
    border : 1px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background-color : transparent;
`
const Button = styled.button`
    border-radius : 3px;
    border : none;
    padding : 10px 20px;
    font-weight : 500;
    cursor : pointer;
    background-color : ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.textSoft};
`
const Label = styled.label`
    font-size : 14px;
`
const Select = styled.select`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background : transparent;
`;
const Option = styled.option`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    background : transparent;
`;

const Text = styled.p`
    color : ${({ theme }) => theme.text};
    font-size : 10px;
    margin-top : 0px;
`;

const baseUrl = process.env.REACT_APP_URL;
const ReportForm = ({open, setOpen}) => {
    const [inputs, setInputs] = useState({});
    const [category, setCategory] = useState("");

    const navigate = useNavigate();    
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${baseUrl}/users/feedback`, {...inputs, category});
        alert("Yout response has been recorded. Thanks!")
        setOpen(false);
        res.status === 200 && navigate(`/`);
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>What You Want To Report ?</Title>
                <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
                <Desc type='text' placeholder='Email ID' name='email' rows={1} onChange={handleChange} />
                <Desc type='text' placeholder='Description in Detail' name='desc' rows={8} onChange={handleChange} />
                <Label>Category of Issue:</Label>
                <Select name="cars" id="cars" onChange={(e) => setCategory(e.target.value)}>
                    <Option value="" defaultValue={null}>Category</Option>
                    <Option value="information">Want Information</Option>
                    <Option value="feedback">Feedback</Option>
                    <Option value="reportcontent">Report Content</Option>
                    <Option value="contact">Contact Owner</Option>
                    <Option value="other">Other</Option>
                </Select>
                <Button onClick={handleSubmit}>Send</Button>
                <Text>Note: All the fields are required.</Text>
            </Wrapper>
        </Container>
    )
}

const Report = () => {
    const [open, setOpen] = useState(false);
    return (
        <Wrapper>
            <Button onClick = {() => setOpen(true)}>
                Report
            </Button>
            {open && <ReportForm setOpen = {setOpen}/>}
        </Wrapper>
    )
}


export default Report
