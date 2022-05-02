import React, {useState} from 'react';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';




export default function AddTraining(props){
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: '', activity: '', customer: ''
    });

    const handleClickOpen = () => {
        setTraining({...training, customer: props.params.data.links[0].href});
        setOpen(true);
    };

    const SaveTraining = () => {
        setTraining({...training, date: new Date(training.date).toISOString});
        props.NewTraining(training);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) =>{
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const dateChanged = (newDate) =>{
        setTraining({...training, date: newDate});
    }

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

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        renderInput={(params) => <TextField {...params} 
                        margin="dense"
                        variant="standard"/>}
                        name='date'
                        value={training.date}
                        onChange={dateChanged}
                        label='Date'
                        />
                    </LocalizationProvider>
                    <br/>
                     <TextField
                        margin="dense"
                        name='activity'
                        value={training.activity}
                        onChange={inputChanged}
                        label='Activity'
                        variant="standard"
                    />
                    <br/>
                    <TextField
                        margin="dense"
                        name='duration'
                        value={training.duration}
                        onChange={inputChanged}
                        label='Duration (min)'
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={SaveTraining}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}