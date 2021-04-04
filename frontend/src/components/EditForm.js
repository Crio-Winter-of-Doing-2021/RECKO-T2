import React, { useState } from 'react'
import { Container, Box, Typography, TextField, Button } from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



const EditAccount = ({ onEdit, onEdit1, oldName, oldDescription, check, setcompany, message,message1 }) => {
  const [id, setId] = useState('')
  const [company, setCompany] = React.useState(setcompany);
  const [name, setName] = useState(oldName)
  const [description, setDescription] = useState(oldDescription)

  const handleChange = (event) => {
    setCompany(event.target.value);
  };


  const onSubmit = (e) => {
    e.preventDefault();
    onEdit({ id, company });
    setId('')
  }


  const checkSubmit = (e) => {
    e.preventDefault();
    onEdit1({ name, description, company });

    setCompany('')
    setName('')
    setDescription('')

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
        <Typography variant="h5" color="textSecondary">Edit Form</Typography>
       

        {check === false ?
          <form onSubmit={onSubmit}>

          {message ===true?
          <Typography variant="h5" color="textSecondary">Account Edited</Typography>
          : null}
            
            {message1 !=='' ?
          <Typography variant="h5" color="textSecondary">{message1}</Typography>
          : null}

            <TextField
              label="Id"
              id="outlined-size-small"
              type="text"
              variant="outlined"
              name="id"
              onChange={(e) => { setId(e.target.value) }} required
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
              EDIT
    </Button>
            <br></br>

          </form>

          :

          <form onSubmit={checkSubmit}>


            <TextField
              label="name"
              id="outlined-size-small"
              type="text"
              variant="outlined"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }} required
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
              value={description}
              onChange={(e) => { setDescription(e.target.value) }} required
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
              disabled
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
              Edit Account
  </Button>
            <br></br>
          </form>
        }
      </Box>
    </Container>
  )
}

export default EditAccount;
