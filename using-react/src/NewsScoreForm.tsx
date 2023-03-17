import { useState } from 'react';
import styled from 'styled-components'
import { Button, PrimaryButton } from './Button';
import ButtonGroup from './ButtonGroup';
import Message from './Message';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';

const NewsScoreForm = () => {

    const [temperature, setTemperature] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [score, setScore] = useState('');
    const [errors, setErrors] = useState([])

    const reset = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setTemperature('');
        setHeartRate('');
        setRespiratoryRate('');
        setScore('');
        setErrors([]);
    }

    const calculateNewsScore = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await fetch("https://us-central1-jovial-beach-205515.cloudfunctions.net/calculateNewsScore", {
                method: "POST",
                body: JSON.stringify({
                    measurements: [
                        { type: "TEMP", value: parseFloat(temperature) },
                        { type: "HR", value: parseFloat(heartRate) },
                        { type: "RR", value: parseFloat(respiratoryRate) }
                    ]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const score = await response.json();
            if (score.score) {
                setScore('News score: ' + score.score);
                setErrors([]);
            } else if (score["invalid-params"]) {
                setErrors(score["invalid-params"]);
                setScore('');
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Form>
            <Header>NEWS score calculator</Header>
            <FormField
                onChange={(v) => setTemperature(v.target.value)}
                name='temperature' value={temperature}
                label='Body temperature'
                subLabel='Degrees celcius' />

            <FormField
                onChange={(v) => setHeartRate(v.target.value)}
                name='heartRate'
                value={heartRate}
                label='Heartrate'
                subLabel='Beats per minute' />

            <FormField
                onChange={(v) => setRespiratoryRate(v.target.value)}
                name='respiratoryRate'
                value={respiratoryRate}
                label='Respiratory rate'
                subLabel='Breaths per minute' />

            <ButtonGroup>
                <PrimaryButton onClick={calculateNewsScore}>Calculate NEWS score</PrimaryButton>
                <Button onClick={reset}>Reset form</Button>
            </ButtonGroup>
            <Message>{score}</Message>
            <ErrorMessage errors={errors}/>
        </Form>);
}

const Form = styled.form`
    margin-top: 99px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    gap: 38px;
    width: fit-content;
    min-width: 404px;
`;

const Header = styled.h2`
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.625;
  `;

export default NewsScoreForm; 