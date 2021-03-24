import React, { Component ,useState} from 'react'
import {Container, Box , Typography ,TextField , CircularProgress, Button} from "@material-ui/core"
import logo from "../media/logo.jpg"
import Axios from 'axios'
import {Redirect} from 'react-router-dom'



// class Login extends Component {

//     constructor(props){
//                 super(props)
//                 let loggedIn = false
//                 const token=localStorage.getItem('token')
//                 if(token)
//                 loggedIn=true
//                 this.state ={
//                     username:"",
//                     password:"",
//                     showProgress:false,
//                     loggedIn
//                 }
//                 this.handleChange = this.handleChange.bind(this)
//                 this.formSubmit = this.formSubmit.bind(this)
//             }
        
//             handleChange = (e) =>{
//                 this.setState({
//                     [e.target.name]: e.target.value
//                 })
//             }

//             async formSubmit(e){
//                         try{
//                             e.preventDefault()
//                             const {username , password} =this.state
//                             const token=await Axios.post("http://localhost:8080/login", {username,password})
//                             if(token==='')
//                             throw "403"
//                             localStorage.setItem('token',token)
//                             this.props.history.replace('/dashboard')
//                             this.setState({
//                                 loggedIn:true
//                             })
//                         }catch(err){
//                             this.setState({
//                                 error: err.message
//                             })
//                         }
//                     }

//     render() {
//         if(this.state.loggedIn===true)
//         return <Redirect to="/dashboard" />

export default function Login({setAuth}){

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
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
            if(parseRes.message!==undefined)
            setAuth(true);
            else
            setAuth(false);
            localStorage.setItem("token",parseRes.token);
        }catch(err){
            console.log(err.message);
        }
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
                {/* <img src={logo} height="100px"></img> */}
                <Typography variant="h5" color="textSecondary">Admin</Typography>

                <form onSubmit={submitForm}> 


                <TextField
          label="Username"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="username"
          onChange={(e) => {setUsername(e.target.value)}} required
         // onChange={this.handleChange}
        //  error={this.state.username_error!=null}
          //  helperText={this.state.username_error}
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
        //  error={this.state.password_error!=null}
         // helperText={this.state.password_error}
          color="secondary"
          size="small"
          fullWidth
          margin="normal"
        />
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
        LOGIN
        </Button>
        <br></br>
            {/* {this.state.error} */}
        </form>
            </Box>
        </Container>
        </>
       
  );
        
    
}
        

//export default Login

