
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


export default function CustomAlert({ isOpen, message }) {
    return (
        <>
            {isOpen && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                    <p>{message}</p>
                </Alert>
            )}
        </>

    );
}