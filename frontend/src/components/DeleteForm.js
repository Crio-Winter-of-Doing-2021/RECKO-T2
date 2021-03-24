import React, { Component ,useState} from 'react'
import {Container, Box , Typography ,TextField , CircularProgress, Button} from "@material-ui/core"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';





const CreateAccount= ({onCreate}) => {
    const[id,setId]=useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

    const onSubmit =(e) =>{
        e.preventDefault();
        
        onCreate({id});
        setId('')
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

            <form onSubmit={onSubmit}> 


            <TextField
      label="Id"
      id="outlined-size-small"
      type="text"
      variant="outlined"
      name="id"
      onChange={(e) => {setId(e.target.value)}} required
     // onChange={this.handleChange}
    //  error={this.state.username_error!=null}
      //  helperText={this.state.username_error}
      color="secondary"
      size="small"
      fullWidth
      margin="normal"
    />

    <br />
    <br />

    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>   
       SELECT COMPANY
      </Button>

        <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>XERO</MenuItem>
        <MenuItem onClick={handleClose}>QUICKBOOKS</MenuItem>
      </Menu>


    <br />
    <br />
    <br />
    <br />
    <Button disabledElevation 
    variant="contained" 
    color="primary" 
    fullWidth
    type="submit"
    // onClick={console.log("gi")}
    >
    DELETE
    </Button>
    <br></br>
        {/* {this.state.error} */}
    </form>
        </Box>
    </Container>
    )
}

export default CreateAccount;
