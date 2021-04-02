import React, { Component ,useState} from 'react'
import {useHistory,Link,Redirect} from "react-router-dom";
import {Container, Box , Typography ,TextField , CircularProgress, Button} from "@material-ui/core"



export default function Login({setAuth}){

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [change,setChange]=useState(false)
    const[message,setMessage]=useState('');
    const history=useHistory();
    const submitForm = async (e) =>{
         e.preventDefault();
        try{
            const body={firstName,lastName,username,password,confirmPassword};
            const response= await fetch("http://localhost:8080/register", {
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes=await response.json();
         //   console.log(parseRes)
            if(parseRes.message===true)
            setChange(true)
            else
            setMessage(parseRes.message)
            console.log("hi");
        }catch(err){
            console.log(err.message);
        }
    }

        return( 

        <>

            {change===true?<Redirect to="/login" /> :

            <>
       
            <Container maxWidth="xlg">
            <Box bgcolor="white"
             textAlign="center" 
             boxShadow="2"
             borderRadius="12px"
             p="24px"
              mt="50px"
              
              >
            <Typography variant="h5" color="textPrimary">RECKO Accounting Integration Service</Typography>
          
            </Box>
            </Container>

           



            <br />
            <br />

          
        
        <Container maxWidth="xs">
            <Box bgcolor="white"
             textAlign="center" 
             boxShadow="2"
             borderRadius="12px"
             p="24px"
              mt="50px"
            >
                <Typography variant="h5" color="textSecondary">Register</Typography>
                {message!==''?
               <Typography variant="h5" color="textSecondary">{message}</Typography>:null
            }
                <form onSubmit={submitForm}> 

            
                <TextField
          label="FirstName"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="FirstName"
          onChange={(e) => {setFirstName(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />


        <TextField
          label="LastName"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="LastName"
          onChange={(e) => {setLastName(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />


                <TextField
          label="Username"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="username"
          onChange={(e) => {setUsername(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />


        <TextField
          label="Password"
          id="outlined-size-small"
          type="Password"
          variant="outlined"
          name="password"
          onChange={(e) => {setPassword(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
          />

          <TextField
          label="ConfirmPassword"
          id="outlined-size-small"
          type="Password"
          variant="outlined"
          name="confirmPassword"
          onChange={(e) => {setConfirmPassword(e.target.value)}} required
          color="secondary"
          size="small"
          fullWidth
          margin="normal"


        />
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
        REGISTER
        </Button>
        <br></br>
        </form>
        <br></br>
        {/* <Button disabledElevation 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={onClick}
        >
        LOGIN
        </Button> */}
        <Link to="/login">
        LOGIN
        </Link>

            </Box>
        </Container>
        </>
      }
        </>
       
  );
        
    
}
    