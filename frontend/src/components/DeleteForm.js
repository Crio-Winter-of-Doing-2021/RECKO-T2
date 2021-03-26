import React, { useState} from 'react'
import {Container, Box , Typography ,TextField , Button} from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';




const DeleteAccount = ({onDelete,message}) => {
    const[id,setId]=useState('')
    const [company, setCompany] = React.useState('');

    const handleChange = (event) => {
      setCompany(event.target.value);
    };
  

    const onSubmit =(e) =>{
        e.preventDefault();
        
        onDelete({id,company})
        setId('')
        setCompany('')
    }

    return (
        <Container maxWidth="xs">
        <Box bgcolor="white"
         textAlign="center" 
         boxShadow="2"
         borderRadius="12px"
         p="24px"
          mt="50px"
        >
            {/* <img src={logo} height="100px"></img> */}
            <Typography variant="h5" color="textSecondary">Delete Form</Typography>
            {message!==null? 
            <Typography variant="h5" color="textSecondary"> {message!==''?message:null}</Typography>
               :null}
            <form onSubmit={onSubmit}> 


            <TextField
      label="Id"
      id="outlined-size-small"
      type="text"
      variant="outlined"
      name="id"
      onChange={(e) => {setId(e.target.value)}} required
      color="secondary"
      size="small"
      fullWidth
      margin="normal"
    />

    <br />
    <br />

    <InputLabel id="demo-simple-select-label">Company</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={company}
          onChange={handleChange}
          required
        >
          <MenuItem value={"XERO"}>XERO</MenuItem>
          <MenuItem value={"QUICKBOOKS"}>QUICKBOOKS</MenuItem>

        </Select>


    <br />
    <br />
    <br />
    <br />
    <Button disabledElevation 
    variant="contained" 
    color="primary" 
    fullWidth
    type="submit"
    >
    DELETE
    </Button>
    <br></br>
    </form>
        </Box>
    </Container>
    )
}

export default DeleteAccount;
