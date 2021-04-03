import React, { Component ,useState} from 'react'
import {useHistory,Link} from "react-router-dom";
import {Container, Box , Typography ,TextField , CircularProgress, Button} from "@material-ui/core"



export default function Login({setAuth}){

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const[message,setMessage]=useState('');
    const history=useHistory();
    const submitForm = async (e) =>{
        e.preventDefault();
        try{
            const body={username,password};
            const response= await fetch("http://localhost:8080/login", {
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes=await response.json();
            if(parseRes.message==='login')
            setAuth(true);
            else{
            setMessage(parseRes.message);
            setAuth(false);
            console.log(message);
            }
            localStorage.setItem("token",parseRes.token);
        }catch(err){
            console.log(err.message);
        }
    }

    const onClick=()=>{
        history.push('/register');
    }
    
    

        return( 
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
                <Typography variant="h5" color="textSecondary">Admin</Typography>
                {message!==''?
                 <Typography variant="h5" color="textSecondary">{message}</Typography>
                :null}       
        
                <form onSubmit={submitForm}> 


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
        LOGIN
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
        REGISTER
        </Button>
         */}
          <Link to="/register">
        REGISTER
        </Link>
        
            </Box>
        </Container>
        </>
       
  );
        
    
}
    
