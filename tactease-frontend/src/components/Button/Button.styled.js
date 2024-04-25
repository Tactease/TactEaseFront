import styled from 'styled-components';

export const ButtonStyled = styled.button`
    // button gets an if empty prop, if true, the button will be colored differently
    background-color: #B2A6FF;
    color: #ffffff;
    border: 1px solid #B2A6FF;
    padding: 15px 0px;
    text-align: center;
    font-size: 1.1em;
    font-weight: 400;
    margin: 10px 0px;
    cursor: pointer;
    border-radius: 10px;
    transition-duration: 0.4s;
    width: ${(props) => props.width ? `${props.width}px` : '100%'};
    
    &:hover {
        background-color: #ffffff;
        border: 1px solid #B2A6FF;
        color: #B2A6FF;
    }

    &:disabled {
        cursor: default;
        opacity: 0.6;
    }

    &:disabled:hover {
        background-color: #B2A6FF;
        color: #ffffff;
        border: 1px solid #B2A6FF;
    }
`;
