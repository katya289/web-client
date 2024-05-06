import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, clearAlert } from '../../features/alert/alertSlice';
import axios from 'axios';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { CloudUpload, Label } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
export default function UploadPodcast({ open, setUploadOpen }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const { isOpen, message, type } = useSelector(state => state.alert);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        format: '',
        file: null,
        preview: null,
    });

    const handleCloseDialog = () => {
        setUploadOpen(false);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePreviewChange = (event) => {
        console.log(event.target.files[0]);
        setPreview(event.target.files[0]);
    }
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleUpload = async () => {
        try {
            const formDataSend = new FormData();
            formDataSend.append('name', formData.name);
            formDataSend.append('description', formData.description);
            formDataSend.append('format', formData.format);
            formDataSend.append('category', formData.category);
            formDataSend.append('file', file);
            formDataSend.append('preview', preview);


            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:4000/api/podcasts/upload', formDataSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('File uploaded successfully:', response.data);
            dispatch(setAlert({ message: 'File uploaded successfully', type: 'success' }));
            navigate('/');
        } catch (error) {
            console.error('Error uploading file:', error);
            dispatch(setAlert({ message: error.response.data.error, type: 'error' }));
        }
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                dispatch(clearAlert());
                // navigate('/');
                setUploadOpen(false)
            }, 4500);
        }
    }, [isOpen, dispatch, navigate]);

    return (
        <Dialog sx={{ bgcolor: 'white' }} open={open} onClose={handleCloseDialog}>
            <DialogTitle>
                Upload podcast
                <CloseIcon onClick={handleCloseDialog} color="primary" sx={{ position: 'absolute', right: 8, cursor: 'pointer' }} />
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <TextField name="name" value={formData.name} onChange={handleInputChange} autoFocus required margin="dense" id="name" label="Podcast name" type="text" fullWidth />
                <TextField name="description" value={formData.description} onChange={handleInputChange} autoFocus required margin="dense" id="desc" label="Podcast description" type="text" fullWidth multiline rows={5} sx={{ height: 'auto', mt: 2 }} />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-label">Format</InputLabel>
                    <Select name="format" value={formData.format} onChange={handleInputChange} label="Format" labelId="select-label">
                        <MenuItem value="Audio">Audio</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                    </Select>



                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-label-category">Category</InputLabel>
                    <Select name="category" value={formData.category} onChange={handleInputChange} label="Category" labelId="select-label-category">
                        <MenuItem value="Comedy">Comedy</MenuItem>
                        <MenuItem value="Arts">Arts</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="News">News</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Business">Business</MenuItem>
                    </Select>
                </FormControl>
                <Box textAlign="center">
                    <input
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name='preview'
                        onChange={handlePreviewChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button sx={{ alignSelf: 'center' }} variant="primary" color="primary" component="span">
                            Choose preview
                        </Button>
                    </label>
                </Box>
                <FormControl
                    sx={{
                        border: '2px dashed #1475cf',
                        height: '150px',
                        width: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        justifyContent: 'center',
                        margin: 'auto',
                        mt: 2,
                    }}
                    action=""
                    onClick={() => document.querySelector('.input-field').click()}
                >
                    <input type="file" accept="image/*,video/*" className="input-field" name='file' hidden onChange={handleFileChange} />
                    <CloudUpload />
                    <Typography>Select your file here</Typography>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpload}>Upload</Button>
            </DialogActions>
            {isOpen && (

                <Alert severity={type} sx={{ width: '200px', position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>{message} </Alert>
            )}
        </Dialog>
    );
}