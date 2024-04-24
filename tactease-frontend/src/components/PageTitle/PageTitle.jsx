import {PageTitleContainer, PageTitleStyled} from './PageTitle.styled.js';


const PageTitle = (props) => {
    const {title} = props;
    return (
        <PageTitleContainer>
            <PageTitleStyled>{title}</PageTitleStyled>
        </PageTitleContainer>
    );
}
export default PageTitle;
