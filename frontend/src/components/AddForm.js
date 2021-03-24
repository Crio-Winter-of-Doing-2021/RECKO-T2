import React from 'react';
import { useState } from 'react'
import {Container, Box , Typography ,TextField , CircularProgress, Button} from "@material-ui/core"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
const CreateAccount = ({onCreate}) => {
    // const[name,setName]=useState('')
    // const[description,setDescription]=useState('')

    // const onSubmit =(e) =>{
    //     e.preventDefault();
        
    //     onCreate({name,type,description});
    //     setName('')

    //     setDescription('')
    // }

    // return (
    //    <form className="add-form" className=".col-6" onSubmit={onSubmit}>
    //        <div className="form-control">
    //            <label>NAME</label>
    //            <input type="text" placeholder="Enter Full Name" required
    //            value ={name}
    //            onChange={(e) => 
    //             setName(e.target.value)}
    //             />
    //        </div>
    //        <div className="form-control">
    //            <label>TYPE</label>
    //            <input type="text" placeholder="Enter the URL of youreAccount" required
    //             value ={type}
    //             onChange={(e) => 
    //              setType(e.target.value)}
    //            />
    //        </div>
    //        <div className="form-control">
    //            <label>Description</label>
    //            <input type="text" placeholder="Be creative with the Caption" required
    //             value ={description}
    //             onChange={(e) => 
    //                 setDescription(e.currentTarget.value)}
    //                 />
    //        </div>

    //        <input type="submit" value="SubmitAccount" className="btn btn-success" />
    //    </form>
    // )

    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const submitForm = async (e) =>{
        e.preventDefault();
        try{
            // const body={username,password};
            // const response= await fetch("http://localhost:8080/login", {
            //     method:"POST",
            //     headers:{ "Content-Type": "application/json" },
            //     body: JSON.stringify(body)
            // });
            // const parseRes=await response.json();
            // if(parseRes.message!==undefined)
            // setAuth(true);
            // else
            // setAuth(false);
            // localStorage.setItem("token",parseRes.token);
        }catch(err){
            console.log(err.message);
        }
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

                <form onSubmit={submitForm}> 


                <TextField
          label="name"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="name"
          onChange={(e) => {setName(e.target.value)}} required
         // onChange={this.handleChange}
        //  error={this.state.username_error!=null}
          //  helperText={this.state.username_error}
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />


        <TextField
          label="description"
          id="outlined-size-small"
          type="Password"
          variant="outlined"
          name="description"
          onChange={(e) => {setDescription(e.target.value)}} required
        //  error={this.state.password_error!=null}
         // helperText={this.state.password_error}
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
        {/* {this.state.showProgress?
        <CircularProgress size={25} thickness={5} color="primary" />
        :null} */}
        <br />
        <br />
        <Button disabledElevation 
        variant="contained" 
        color="primary" 
        fullWidth
        type="submit"
        // onClick={console.log("gi")}
        >
        Create Account
        </Button>
        <br></br>
            {/* {this.state.error} */}
        </form>
            </Box>
        </Container>
        )
    











}

export default CreateAccount;
