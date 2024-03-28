import OutlinedInput from '@mui/material/OutlinedInput';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { IconButton, Box, Input, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel, Select, MenuItem, FormControl, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function UploadPodcast() {
    const handleClose = () => {
        console.log("closed pressed")
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Upload podcast</DialogTitle>
            <DialogContent sx={{ p: 2 }}> {/* Added padding */}
                <TextField autoFocus required margin='dense' id='name' label='Podcast name' type='text' fullWidth />
                <TextField autoFocus required margin='dense' id='desc' label='Podcast description' type='text' fullWidth multiline rows={5} sx={{ height: 'auto', mt: 2 }} /> {/* Added margin-top */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}> {/* Added margin-top and gap */}
                    <FormControl fullWidth sx={{ flex: 1 }}> {/* Added flex: 1 */}
                        <InputLabel id='select-label'>Format</InputLabel>
                        <Select label='Format' labelId='select-label'>
                            <MenuItem>Audio</MenuItem>
                            <MenuItem>Video</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ flex: 1 }}> {/* Added flex: 1 */}
                        <InputLabel id='select-label-category'>Category</InputLabel>
                        <Select label='Category' labelId='select-label-category'>
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
                        mt: 2, // Added margin-top
                    }}
                    action=""
                    onClick={() => document.querySelector(".input-field").click()}
                >
                    <input type="file" accept="image/*" className="input-field" hidden />
                    <CloudUpload />
                    <Typography>Select your file here</Typography>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button>Upload</Button>
            </DialogActions>
        </Dialog>
    );
}
