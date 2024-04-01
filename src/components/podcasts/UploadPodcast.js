import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { IconButton, Box, Input, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import AWS from 'aws-sdk';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function UploadPodcast({openDialog, setOpenDialog, setOpen}) {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        format: '',
        file: null,
    });
    
    const handleCloseDialog = () => {
        setOpenDialog(false)
        setOpen(true)
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzExODczOTMxLCJleHAiOjE3MTE5NjAzMzF9.U1WLLo1502PPsnop6GOPFhTM9D4rBNTOaQ6rTKx8Ndo';
            const response = await axios.post('http://127.0.0.1:4000/api/podcasts/upload', formDataSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }

            });
            console.log('File uploaded successfully:', response.data);
            console.log('Navigating to the main page...');
            navigate('/login');
        }

        catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
           
            <DialogTitle>Upload podcast 
            <CloseIcon onClick={handleCloseDialog} color='primary' sx={{position: 'absolute', right: 8, cursor: 'pointer'}}  />
            </DialogTitle>
            
            <DialogContent sx={{ p: 2 }}>
                <TextField name='name' value={formData.name} onChange={handleInputChange} autoFocus required margin='dense' id='name' label='Podcast name' type='text' fullWidth />
                <TextField name='description' value={formData.description} onChange={handleInputChange} autoFocus required margin='dense' id='desc' label='Podcast description' type='text' fullWidth multiline rows={5} sx={{ height: 'auto', mt: 2 }} /> {/* Added margin-top */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id='select-label'>Format</InputLabel>
                        <Select name='format' value={formData.format} onChange={handleInputChange} label='Format' labelId='select-label'>
                            <MenuItem>Audio</MenuItem>
                            <MenuItem>Video</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id='select-label-category'>Category</InputLabel>
                        <Select name='category' value={formData.category} onChange={handleInputChange} label='Category' labelId='select-label-category'>
                            <MenuItem>Comedy</MenuItem>
                            <MenuItem>Arts</MenuItem>
                            <MenuItem>Education</MenuItem>
                            <MenuItem>Fitness</MenuItem>
                            <MenuItem>Sports</MenuItem>
                            <MenuItem>Business</MenuItem>
                        </Select>
                    </FormControl>
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
                    onClick={() => document.querySelector(".input-field").click()}
                >
                    <input type="file" accept="image/*,video/*" className="input-field" hidden onChange={handleFileChange} />
                    <CloudUpload />
                    <Typography>Select your file here</Typography>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpload}>Upload</Button>
            </DialogActions>
        </Dialog>
    );
}
