import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props){
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: '', activity: '', customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) =>{
        setTraining({...training, [event.target.name]: event.target.value});
    };

    return (
        <div>
             <IconButton aria-label="Add Training" 
                onClick={handleClickOpen}>
                <AddTaskIcon />
                </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Add a new training to {props.params.data.firstname} {props.params.data.lastname}
                    </DialogTitle>
                <DialogContent>
                <TextField
                        margin="dense"
                        name='date'
                        value={training.date}
                        onChange={inputChanged}
                        label='Date'
                        variant="standard"
                        />
                <TextField
                        margin="dense"
                        name='activity'
                        value={training.activity}
                        onChange={inputChanged}
                        label='Activity'
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='duration'
                        value={training.duration}
                        onChange={inputChanged}
                        label='Duration'
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}