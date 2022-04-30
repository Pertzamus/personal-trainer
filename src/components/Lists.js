import React, { useState, useEffect }  from "react";
import { AgGridReact } from "ag-grid-react";
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { format as dateFormat } from 'date-fns';



export default function Lists() {

    const [value, setValue] = useState('Customers');
    const handleChange = (event, value) => {  setValue(value);};



    function Customers() {

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
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
            {headerName: "Last Name", 
            field: "lastname", 
            sortable:true, 
            filter:true, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
            {
            headerName: "Street Address", 
            field: "streetaddress", 
            sortable:true, 
            filter:true, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
            {
            headerName: "Postcode", 
            field: "postcode", 
            sortable:true, 
            filter:true, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
            {
            headerName: "City", 
            field: "city", 
            sortable:true, 
            filter:true, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
            {
            headerName: "Email", 
            field: "email", 
            sortable:true, 
            filter:true, 
            resizable:true, 
            floatingFilter:true,
            flex: 1
        },
            {
            headerName: "Phone", 
            field: "phone", 
            sortable:true, 
            filter:true, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
        ];

        return (
            
              <div className="ag-theme-material"
              style={{height: '1000px', width: '80%', margin: 'auto'}} >
                <AgGridReact  
                rowData={customers} 
                columnDefs={columns}
                animateRows={true}
                suppressMovableColumns={true}

                >
                </AgGridReact>
        </div>

        )
    }

    function Trainings() {
        const [trainings, setTrainings] = useState([]);

        useEffect( () => {fetchTrainings(); }, []);

        const fetchTrainings = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings' )
            .then(response => response.json() )
            .then(data => setTrainings(data))

      }

      const columns = [
        { 
            headerName: "Date", 
            field: "date", 
            valueFormatter: params => dateFormat(new Date(params.data.date), "dd.MM.yyyy"),
            sortable:true, 
            filter:true, 
            width:120, 
            resizable:true,
            floatingFilter:true,
            flex: 1

        },
        { 
            headerName: "Duration", 
            field: "duration", 
            valueFormatter: params => params.data.duration+" min",
            sortable:true, 
            filter:true, 
            width:90, 
            resizable:true,
            floatingFilter:true,
            flex: 1
        },
        { 
            headerName: "Activity", 
            field: "activity", 
            sortable:true, 
            filter:true, 
            width:150, 
            resizable:true, 
            floatingFilter:true,
            flex: 2
        },
        { 
            headerName: "Customer", 
            field: "customer.lastname",
            valueFormatter: params => {
                if(params.data.customer){
                    return params.data.customer.firstname + " " + params.data.customer.lastname;
                } else {
                    return "";
                }
            },
            sortable:true, 
            filter:true, 
            width:150, 
            resizable:true, 
            floatingFilter:true
            ,
            flex: 2
        },

      ];
      return (
            
        <div className="ag-theme-material"
        style={{height: '700px', width: '80%', margin: 'auto'}} >
          <AgGridReact  
            rowData={trainings} 
            columnDefs={columns}
            animateRows={true}
            suppressMovableColumns={true}
          >
          </AgGridReact>
  </div>

  )

    }

        return (
          <div>
        <Tabs value={value}onChange={handleChange}>
            <Tab value="Customers"label="Customers" />       
            <Tab value="Trainings"label="Trainings" />
        </Tabs>
        {value === 'Customers' && <div> <Customers /></div>}
        {value === 'Trainings' && <div> <Trainings /></div>}
        </div>
        );
      
}