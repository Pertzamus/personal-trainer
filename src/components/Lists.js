import React, { useState, useEffect }  from "react";
import { AgGridReact } from "ag-grid-react";
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import { format as dateFormat } from 'date-fns';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Delete from "./Delete";
import AddTraining from "./AddTraining";



export default function Lists() {

    const [value, setValue] = useState('Customers');
    const handleChange = (event, value) => {  setValue(value);};
    const [trainings, setTrainings] = useState([]);

    function Customers() {

        const [customers, setCustomers] = useState([]);
        const [open, setOpen] = React.useState(false);
        const [msg, setMsg] = useState('');

        useEffect(() =>  fetchCustomers(), []);


        const fetchCustomers = () => {
            fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
        }

        const SaveCustomer = (customer) => {
            fetch('https://customerrest.herokuapp.com/api/customers',{
                method: 'POST',
                headers: {'Content-type': 'application/json'
            },
                body: JSON.stringify(customer)
            })
                .then(response => {
                    if(response.ok){
                        fetchCustomers();
                        setMsg("New Customer added.");
                        setOpen(true);
                    } else {
                        alert('Error while adding customer')
                    }
                })
                .catch( err => console.error(err) );
    
        }

        const UpdateCustomer = (customer, link) => {
            fetch(link,{
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(customer)
            })
                .then(response => {
                    if(response.ok){
                        setMsg("Customer updated.");
                        setOpen(true);
                        fetchCustomers();
                    } else {
                        alert('Error while editing customer')
                    }
                })
                .catch( err => console.error(err) );
    
        }

        const DeleteCustomer = (link) => {
            fetch(link, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    setMsg("Customer deleted.");
                    setOpen(true);
                    fetchCustomers();
                } else {
                    alert('Error while deleting customer');
                }
            } )
            .catch( err => console.error(err) );
        }

        const NewTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/api/trainings',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(training)
        })
        .then( response => {
            if(response.ok){
                setMsg("New Training added.");
                setOpen(true);
            } else {
                alert('Error while adding training')
            }
        })
        .catch( err => console.error(err) );

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
        {   
            headerName: "", 
            field: "links.0.href",
            width: 60,
            cellRendererFramework: params => 
            <AddTraining NewTraining={NewTraining} params={params}  />
        },
        {
            width: 60,
            headerName: "", 
            field: '_links.0.href',
            cellRenderer: params => 
            <EditCustomer  UpdateCustomer={UpdateCustomer} params={params} />
        },
        {
            width: 60,
            headerName: "",
            field: '_links.0.href',
            cellRenderer: params =>
            <Delete  DeleteThing={DeleteCustomer} params={params} />
        },
        ];

        return (
            <>
              <div className="ag-theme-material"
              style={{height: '1000px', width: '80%', margin: 'auto'}} >
                <AddCustomer SaveCustomer={SaveCustomer} />
                <AgGridReact  
                   rowData={customers} 
                   columnDefs={columns}
                   animateRows={true}
                   suppressMovableColumns={true}
                >
                </AgGridReact>
        </div>
        <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
      </>

        )
    }

    function Trainings() {
        const [trainings, setTrainings] = useState([]);
        const [open, setOpen] = React.useState(false);
        const [msg, setMsg] = useState('');

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