import styled from "styled-components";
import { NavLink as RouterLink } from "react-router-dom";

const NavigateStyle = styled.div`
    display: flex;
    position: relative;
    flex-flow: row;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
        display: none;
    }
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
`;

const LinkStyle = styled(RouterLink)`
    color: #3779CF;
    font-size: 1.2em;
    text-decoration: none;
    &.active {
        font-weight: 600;
    }
`;

export { NavigateStyle, UlStyle, LiStyle, LinkStyle};
