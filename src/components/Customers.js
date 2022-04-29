import React, { useState, useEffect }  from "react";
import { AgGridReact } from "ag-grid-react";
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function Lists() {

    function Customers() {
        <h2>This is Customers page</h2>;

        const [customers, setCustomers] = useState([]);

        useEffect(() =>  fetchCustomers(), []);


        const fetchCustomers = () => {
            fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
        }

        const columns = [
            {headerName: "First Name",
            field: "firstname",
            sortable:true, 
            filter:true, 
            width:130, 
            resizable:true
        },
            {headerName: "Last Name", 
            field: "lastname", 
            sortable:true, 
            filter:true, 
            width:130, 
            resizable:true
        },
            {
            headerName: "Street Address", 
            field: "streetaddress", 
            sortable:true, 
            filter:true, 
            width:200, 
            resizable:true
        },
            {
            headerName: "Postcode", 
            field: "postcode", 
            sortable:true, 
            filter:true, 
            width:120, 
            resizable:true
        },
            {
            headerName: "City", 
            field: "city", 
            sortable:true, 
            filter:true, 
            width:150, 
            resizable:true
        },
            {
            headerName: "Email", 
            field: "email", 
            sortable:true, 
            filter:true, 
            width:200, 
            resizable:true, 
            flex:1
        },
            {
            headerName: "Phone", 
            field: "phone", 
            sortable:true, 
            filter:true, 
            width:150, 
            resizable:true
        },
        ];
      

      
      
        return (
          <div className="ag-theme-material.css"
          style={{height: '700px', width: '80%', margin: 'auto'}}>
            <AgGridReact  rowData={customers} columnDefs={columns}>
                </AgGridReact>
          </div>
        );
      }
}