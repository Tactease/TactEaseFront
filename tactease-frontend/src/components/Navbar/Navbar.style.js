import styled from "styled-components";

const NavigateStyle = styled.div`
    display: flex;
    position: relative;
    flex-flow: row;
    align-items: center;
    width: 100%;
`;

const UlStyle = styled.ul`
    display: flex;
    justify-content: center;
    flex-flow: row;
    padding: 0;
    margin: 0 5%;
`;

const LiStyle = styled.li`
    display: flex;
    justify-content: center;
    flex-flow: row;
    padding: 0 15%;
    color: #3779CF;
    font-size: 1.2em; 
`;

export { NavigateStyle, UlStyle, LiStyle};
