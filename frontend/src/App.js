import React from 'react'
import  {useState,useEffect} from 'react'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Form from './components/Form'
import EditForm from './components/EditPage'
import DeleteForm from './components/DeletePage'
import HomePage from './components/HomePage'
import Table from './components/TableContent'

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(null);
  const [val,setVal]=useState(false);
  
  const checkAuthenticated =async () =>{
    try{
      const response=await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: {
          Authorization : "Bearer " +localStorage.token
        }
      });
      const parseRes = await response.json();
    //  console.log(parseRes);
      parseRes===true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }catch(err){
      console.log(err.message)
    }
  };

  const checkLogin=async()=>{
    try{
      const response=await fetch('http://localhost:8080/ck',{
        method: "POST",
        headers: {
          Authorization : "Bearer " +localStorage.token
        }
      });
      const parseRes = await response.json();
      parseRes===true?setVal(true):setVal(false)
      }catch(err){
        console.log(err.message)
      }
    }






  useEffect(() => {
    const pathname =window.location.pathname;
    console.log(pathname);
  //  console.log(isAuthenticated);
    if(pathname!=="/login" || localStorage.getItem("token") !== null){
        console.log(localStorage.getItem("token"));
        checkAuthenticated();
        console.log(isAuthenticated);
        checkLogin();
        console.log(val);
   }
  });

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const logout = boolean => {
    setIsAuthenticated(false);
   // localStorage.removeItem("token");
  }

 



  return (
   <Switch>
     <Route exact path={["/","/login"]}  render= {props =>
     !isAuthenticated !==null ? (!isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />) : null
     }
     />

    <Route exact path="/register"  render= {props =>
     !isAuthenticated !==null ? (!isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/homepage" />) : null
     }
     />

      <Route exact path="/logout" render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? <Logout setAuth={setAuth} logout={logout}/>: <Redirect to="/login" />):null
     }
     />
      <Route exact path="/homepage"  render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? <HomePage  {...props} logout={logout} val={val}/>: <Redirect to="/login" />):null
     }
     />

    <Route exact path="/table"   render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? (val ? <Table  {...props} logout={logout} /> : <Redirect to="/homepage" />): <Redirect to="/login" />):null
     }
     />

    <Route exact path="/addForm"  render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? (val ? <Form  {...props} setAuth={setAuth} logout={logout}  />:<Redirect to="/homepage" />): <Redirect to="/login" />):null
     }
     />

   <Route exact path="/editForm"  render= {props =>
     isAuthenticated !==null ? (isAuthenticated ? (val ? <EditForm  {...props} setAuth={setAuth} logout={logout}  />:<Redirect to="/homepage" />): <Redirect to="/login" />):null
     }
     />

    <Route exact path="/deleteForm"  render= {props =>
     isAuthenticated !==null ? (isAuthenticated ?(val ? <DeleteForm  {...props} setAuth={setAuth} logout={logout}  />: <Redirect to="/homepage" />): <Redirect to="/login" />):null
     }
     />
   </Switch>
  );
}

export default App;
