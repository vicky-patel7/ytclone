import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

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
    display : flex;
    padding : 18px 16px;
    align-items : center;
    gap : 5px;
`;

const Help = ({ darkMode, setMode }) => {
    return (
        <Container>
            <ItemContainer>
                <ItemDiv>
                    <Title>Use report form to get any type of help.</Title>
                    <Link to='/report' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Item>
                            <ReportIcon /> Report
                        </Item>
                    </Link>
                </ItemDiv>
            </ItemContainer>
        </Container>
    )
}

export default Help;