import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { format as dateFormat } from 'date-fns';
import {   
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
         } from '@mui/material';

export default function Delete(props){

    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        if(props.params.data.firstname){
            setDialogContent(
                "Are you sure you want to delete customer " 
                + props.params.data.firstname + " " 
                + props.params.data.lastname + "?"
                )
        }
        else if (props.params.data.activity){
            setDialogContent("Are you sure you want to delete activity: " 
            + props.params.data.activity + " - Date: " 
            + dateFormat(new Date(props.params.data.date), "dd.MM.yyyy"))
        }
    };


    const handleDelete = () => {
        handleClose();
        if(props.params.data.links){
            props.DeleteThing(props.params.data.links[0].href);
        } else if(props.params.data.activity){
            props.DeleteThing('https://customerrest.herokuapp.com/api/trainings/'+props.params.data.id);
        }
        
    }

    return (
        <div>
            <IconButton aria-label="delete" color="error"
                onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    }
