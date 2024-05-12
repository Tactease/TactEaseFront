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

export const TableHeaderCell = styled.span`
    font-weight: 600;
    font-size: 1.05rem;
`;

export const SecondTableHeader = styled.h2`
font-size: 1rem;

text-align: center;
    font-weight: 500;
`;

export const RequestsFormContainer = styled.div`
    display: flex;
    flex-flow: column;
    margin: 15px 0px;
    gap: 15px;
`;

export const ApproveFormContainter = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
`;

export const PendingRequestsCell = styled.div`
    color: ${props => {
        switch (props.status) {
            case "true":
                return '#9489D6';
            default:
                return 'inherit';
        }
    }};
    font-weight: 500;
`;