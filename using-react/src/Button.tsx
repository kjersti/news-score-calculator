import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    font-weight: 400;
    font-size: 1rem;
    padding: 8px 16px;
    background-color: var(--color-primary-light);
    border-radius: 40px;    
`;

const PrimaryButton = styled(Button)`
    background-color: var(--color-primary);
    color: var(--color-white);
`;

export { Button, PrimaryButton };

