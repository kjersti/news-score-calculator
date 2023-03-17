import { FC } from "react";
import styled from "styled-components";

type Props = {
    children?: React.ReactNode;
    variant?: string
}

const Message: FC<Props> = ({ children, variant }) => {
    return (
        children ?
            (variant === "error" ?
                <ErrorWrapper>{children}</ErrorWrapper>
                : <Wrapper>{children}</Wrapper>)
            : null
    );
}

const Wrapper = styled.div`
    padding: 16px;
    color: var(--color-primary-dark);
    background: linear-gradient(0deg, var(--color-primary-transparent), var(--color-primary-light));
    border: 1px solid hsla(266, 72%, 50%, 0.05);
    font-weight: 400;
    font-size: 1.25rem;
`;

const ErrorWrapper = styled(Wrapper)`
    color: var(--color-red);
    font-size: 1rem;
`;


export default Message; 