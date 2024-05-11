import styled from 'styled-components';

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