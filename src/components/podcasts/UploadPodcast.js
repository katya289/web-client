
import OutlinedInput from '@mui/material/OutlinedInput';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { IconButton, Box, Input, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Uploader from '../uploader/Uploader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadPodcast() {
    
    const handleClose = () => {
        console.log("closed pressed")
    }
    return (

        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Upload podcast</DialogTitle>
            <DialogContent>
                <TextField autoFocus required margin='dense' id='name' label='Podcast name' type='text' fullWidth></TextField>
                <TextField autoFocus required margin='dense' id='desc' label='Podcast description' type='text' fullWidth multiline rows={5} sx={{ height: 'auto' }}></TextField>
                <InputLabel id='select-label'>Format</InputLabel>
                <Select label='Format' labelId='select-label'>
                    <MenuItem>Audio</MenuItem>
                </Select>
                <Select label='Category' labelId='select-label-category'>
                    <MenuItem>Comedy</MenuItem>
                    <MenuItem>Arts</MenuItem>
                    <MenuItem>Education</MenuItem>
                    <MenuItem>Fitness</MenuItem>
                    <MenuItem>Sports</MenuItem>
                    <MenuItem>Business</MenuItem>
                </Select>

            </DialogContent>
            <DialogActions>

                <FormControl sx={{
                    border: '2px dashed #1475cf', height: '150px',
                    width: '400px', display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer', borderRadius: '5px', justifyContent: 'center'
                }} action="" onClick={() => document.querySelector(".input-field").click()}>
                    <input type="file" accept="image/*" className="input-field" hidden></input>
                    <CloudUploadIcon />
                    <Typography>Select your file here</Typography>
                </FormControl>

            </DialogActions>
            <Button>Upload</Button>
        </Dialog>




    );


}