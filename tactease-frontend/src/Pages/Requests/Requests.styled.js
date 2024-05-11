import styled from "styled-components";

export const RequestsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 25px;
`;

export const RequestsDataGrid = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StatusCell = styled.div`
    color: ${props => {
        switch (props.status) {
            case 'Pending':
                return '#9489D6';
            case 'Approved':
                return '#6BD0A0';
            case 'Rejected':
                return '#FD6868';
            default:
                return 'inherit';
        }
    }};
    font-weight: 500;
`;