import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
    display : flex;
    flex-wrap : wrap;
    gap : 1px;
`;

const ItemContainer = styled.div`
    display : flex;
    flex-direction : column;
    gap : 5px;
    background-color: ${({ theme }) => theme.bgLighter};
    color : ${({ theme }) => theme.text};
    background : transparent;
`;

const ItemDiv = styled.div`
    display : flex;
    margin : 20px;
    gap : 100px;
    align-items : center;
`;

const Title = styled.div`
    font-size : 18px;
    font-weight : bold;
`;
const Item = styled.div`
    padding : 18px 16px;
`;
const Button = styled.div`
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

const Setting = ({darkMode, setMode}) => {
    return (
        <Container>
            <ItemContainer>
                <ItemDiv>
                    <Title>Choose Theme - (Dark/Light)</Title>
                    <Item>
                        <Button onClick={() => setMode(!darkMode)}>
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </Item>
                </ItemDiv>
            </ItemContainer>
        </Container>
    )
}

export default Setting;