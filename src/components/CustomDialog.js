import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

export const CustomDialog = ({ isOpen, handleClose, title, subtitle, children }) => {
    return (
        <>
            <Dialog fullWidth maxWidth='md' open={isOpen} onClose={handleClose} aria-labelledby="max-width">
                <DialogTitle id='max-width-dialog-title'>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{subtitle}</DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

CustomDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.element.isRequired
};
