import { FC } from "react";
import Message from "./Message";

type Error = {
    name: string, 
    reason: string
}

type Props = {
    errors: Error[]
}

const ErrorMessage: FC<Props> = ({ errors }) => {
    return (
        errors.length > 0 ? <Message variant="error">
            <ul>
                {errors.map((e: Error) => <li key={e.name}>{e.name}: {e.reason}</li>)}
            </ul>
        </Message> : null
    );
}

export default ErrorMessage;