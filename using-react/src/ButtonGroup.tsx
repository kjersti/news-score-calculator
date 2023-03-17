import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode
};

const ButtonGroup: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.section`
    display: flex;
    gap: 24px;
  `;

export default ButtonGroup;