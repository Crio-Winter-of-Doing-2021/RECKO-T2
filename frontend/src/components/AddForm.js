import React from 'react';
import {Container, Box , Typography ,TextField , Button} from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
const CreateAccount = ({onCreate,message}) => {

    const[name,setName]=React.useState('')
    const[description,setDescription]=React.useState('')
    const [company, setCompany] = React.useState('');

    const handleChange = (event) => {
      setCompany(event.target.value);
    };

    const submitForm = async (e) =>{
        e.preventDefault();
        
        onCreate({name,description,company});
        setName('')
        setDescription('')
        setCompany('')
        
    }
    

        return( <Container maxWidth="xs">
            <Box bgcolor="white"
             textAlign="center" 
             boxShadow="2"
             borderRadius="12px"
             p="24px"
              mt="50px"
            >
                {/* <img src={logo} height="100px"></img> */}
                <Typography variant="h5" color="textSecondary">Add Form</Typography>
                {message!==null? 
          <Typography variant="h5" color="textSecondary"> {message!==''?message:null}</Typography>
               :null}
                <form onSubmit={submitForm}> 


                <TextField
          label="name"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="name"
          onChange={(e) => {setName(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />


        <TextField
          label="description"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="description"
          onChange={(e) => {setDescription(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />

        <br />
        <br />

        <InputLabel id="simple-select-label">Company</InputLabel>
      <Select
          labelId="simple-select-label"
          id="simple-select"
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
        Create Account
        </Button>
        <br></br>
        </form>
            </Box>
        </Container>
        )
    











}

export default CreateAccount;
