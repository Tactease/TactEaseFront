export const formatMissionType = (requestType) => {
    switch (requestType) {
        case 'PERSONAL_REQUEST':
            return 'Personal Request';
        case 'MEDICAL_REQUEST':
            return 'Medical Request';
        default:
            return requestType;
    }
};