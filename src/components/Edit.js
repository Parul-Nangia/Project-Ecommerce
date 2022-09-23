import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
// import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";


const useStyles = makeStyles({
    headingColor: {
     backgroundColor: deepPurple[400],
     color: "white"
    },
    addempuColor: {
     backgroundColor: green[400],
     color: "white"
    },
   
   });




const Edit = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { _id } = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({
     stuname: "",
     email: ""
    });
   

 



    return (
        <>
        <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
          <Typography variant="h2">React CRUD with API Call</Typography>
        </Box>
      
        <Grid container justifyContent="center" spacing={4}>
          <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} className={classes.addempuColor} mb={2}>
              <Typography variant="h4">Edit Student</Typography>
            </Box>
            <form>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField autoComplete="id"  variant="outlined"  fullWidth autoFocus value={_id} disabled  label="ID"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField   variant="outlined"  required fullWidth value={name}  label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="email"  variant="outlined"  required fullWidth  value={email} label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="phone"variant="outlined"   required fullWidth  value={phone}  label="Phone"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="gender"  variant="outlined"   required fullWidth value={gender} label="Gender"/>
                </Grid>
             
              </Grid>
              <Box m={3}>
                <Button type="button" variant="contained" color="primary" onClick={updateEmployee}> Update </Button>
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







  //   const {_id} = useParams();
  //   const [employ, setEmploy] = useState([]);
    
  //   const [name,setName] = useState("");
  //   const [email,setEmail] = useState("");
  //   const [phone,setPhone] = useState("");
  //   const [gender,setGender] = useState("");


  //   useEffect(()=> {
  //     async function editEmployee(){
  //     try {
  //       const employ = await axios.get(`http://localhost:1999/employee/${_id}`)
  //       setEmploy(employ.data);

  //     } catch (error) {
  //       console.log("unable to fetch api for editing employee")
  //     }
  //   }
  //   editEmployee();
  //   }, [_id])
  


  // function handleChange(e) {
  //   setName(e.target.value);
  //   setEmail(e.target.value);
  //   setPhone(e.target.value);
  //   setGender(e.target.value);
  // }

