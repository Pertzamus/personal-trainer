import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer(props){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname:      props.params.data.firstname,
            lastname:       props.params.data.lastname,
            streetaddress:  props.params.data.streetaddress,
            postcode:       props.params.data.postcode,
            city:           props.params.data.city,
            email:          props.params.data.email,
            phone:          props.params.data.phone
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const SaveCustomer = () => {
        props.UpdateCustomer(customer, props.params.data.links[0].href);
    }

    const inputChanged = (event) =>{
        setCustomer({...customer, [event.target.name]: event.target.value});
    };


    return (
        <div>
            <IconButton aria-label="Edit" color="info"  
                onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name='firstname'
                        value={customer.firstname}
                        onChange={inputChanged}
                        label='First Name'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='lastname'
                        value={customer.lastname}
                        onChange={inputChanged}
                        label='Last Name'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label='Street Address'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='postcode'
                        value={customer.postcode}
                        onChange={inputChanged}
                        label='Postcode'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='city'
                        value={customer.city}
                        onChange={inputChanged}
                        label='City'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='email'
                        value={customer.email}
                        onChange={inputChanged}
                        label='Email'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name='phone'
                        value={customer.phone}
                        onChange={inputChanged}
                        label='Phone'
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={SaveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}