import { ChangeEventHandler, FC } from "react";
import styled from "styled-components";

type Props = {
    name: string,
    value: string,
    label: string,
    subLabel?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const NumberInput: FC<Props> = ({ label, subLabel, name, value, onChange }) => {
    return (
        <Label htmlFor={name}>
            <InputLabel>{label}</InputLabel>
            <SubLabel>{subLabel}</SubLabel>
            <Input id={name} type="text" inputMode="decimal" autoComplete="off" name={name} value={value} onChange={onChange} />
        </Label>
    );
}

const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;
    line-height: 1;
`;

const InputLabel = styled.span`
    font-weight: 600;
    font-size: 1rem;
`;

const SubLabel = styled.span`
    font-weight: 400;
    font-size: 0.875rem;
`;

const Input = styled.input`
    background: linear-gradient(0deg, var(--color-primary-transparent), var(--color-primary-light));
    border: 1px solid hsla(266, 72%, 50%, 0.05);
    margin-top: 6px;
    padding: 10px 12px 10px 24px;
`;

export default NumberInput;