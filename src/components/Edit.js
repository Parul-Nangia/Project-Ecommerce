import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
    headingColor: {
     backgroundColor: deepPurple[400],
     color: "white"
    },
    addStuColor: {
     backgroundColor: green[400],
     color: "white"
    },
   
   });


const Edit = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const {id} = useParams();
    const [employ, setEmploy] = useState({
        name:"",
        email:"",
        phone:"",
        gender:""
    }); 
    useEffect(()=>{
        async function getOneEmploy(){
            try{
                await axios.put(`http://localhost:1999/employee/${id}`, employ)
                setEmploy(employ.data)
        
            } catch(error){
                console.log("Something went Wrong");
            }
        }

        getOneEmploy();
    },  [id])




    function onTextFieldChange(e){
        setEmploy({
        ...employ,     
        [e.target.name] : e.target.value   // along with adding employee it will delete existing employees so thats why we use spread operator above
    
    }) 
    console.log(employ)
    }





    async function onFormSubmit(e){
    e.preventdefault()  //donot refresh
    try{
        await axios.post(`http://localhost:1999/employee`, employ)
        
    } catch(error){
        console.log("Something went Wrong");
        }
    }
    



    return (
        <>
         <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
          <Typography variant="h2">React CRUD with API Call</Typography>
         </Box>
      
         <Grid container justify="center" spacing={4}>
          <Grid item md={6} xs={12}>
           <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
           </Box>
           <form>
            <Grid container spacing={2}>
             <Grid item xs={12} sm={6}>
              <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={id} disabled />
             </Grid>
             <Grid item xs={12} sm={6}>
              <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" label="name" value={employ.name} onChange={e => onTextFieldChange(e)} />
             </Grid>
             <Grid item xs={12} sm={6}>
              <TextField autoComplete="phone" name="phone" variant="outlined" required fullWidth id="phone" label="phone" value={employ.phone} onChange={e => onTextFieldChange(e)} />
             </Grid>
             <Grid item xs={12} sm={6}>
              <TextField autoComplete="gender" name="gender" variant="outlined" required fullWidth id="gender" label="gender" value={employ.gender} onChange={e => onTextFieldChange(e)} />
             </Grid>
             <Grid item xs={12}>
              <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={employ.email} onChange={e => onTextFieldChange(e)} />
             </Grid>
            </Grid>
            <Box m={3}>
             <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}> Update </Button>
            </Box>
           </form>
           <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={()=>navigate("/dashboard")}>Back to Home</Button>
           </Box>
          </Grid>
         </Grid >
        </>
       )
      }
      
      export default Edit