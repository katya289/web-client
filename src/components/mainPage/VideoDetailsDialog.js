
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export default function VideoDialog({videoShow}) {
  return (
    <Dialog open={videoShow}>
    <DialogTitle>Set backup account</DialogTitle>
    
  </Dialog>
  );
}