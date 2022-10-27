import { makeStyles } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

const useStyles = makeStyles({
  addEmpColor: {
    backgroundColor: "#87CEFA",
    textAlign: "center",
    marginBottom: "5px",
    color: "#000000",
    marginTop: "30px",
    fontWeight: "bold",
    marginTop: "80px",
  },
});

const Edit = () => {
  // const [employs, setEmploys] = useState([])
  const [name, setName] = React.useState(" ");
  const [email, setEmail] = React.useState(" ");
  const [phone, setPhone] = React.useState(" ");
  const [gender, setGender] = React.useState(" ");
  const { _id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const getEmployeeDetails = async () => {
    let employ = await fetch(`http://localhost:1999/employee/${_id}`);
    employ = await employ.json();
    console.warn(employ);

    setName(employ.name);
    setEmail(employ.email);
    setPhone(employ.phone);
    setGender(employ.gender);
  };

  function updateEmployee() {
    let item = { name, email, phone, gender };
    console.warn("item", item);
    fetch(`http://localhost:1999/employee/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        // employeeList()
      });
    });
  }

  //  useEffect(() => {
  //   async function getEmployeeDetails() {

  //    try {
  //     const employ = await axios.put(`http://localhost:1999/employee/${_id}`)
  //     console.log(employ.data);
  //     setEmploy(employ.data);
  //    } catch (error) {
  //     console.log("Something is Wrong");
  //    }
  //   }
  //   getEmployeeDetails();
  //  }, [_id]);

  // function onTextFieldChange(e) {
  //   setEmploy({
  //    ...employ,
  //    [e.target.name]: e.target.value
  //   })
  //  }

  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <>
      {/*     
      <Grid container justifyContent="center" spacing={4}>
       <Grid item md={6} xs={12}>
        <Box textAlign="center" p={2} className={classes.addEmpColor} mb={2}>
         <Typography variant="h4">Update Employee</Typography>
        </Box>
        <form>
         <Grid container spacing={2}>
          <Grid item xs={12}>
           <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="Employee ID" autoFocus value={_id} disabled />
          </Grid>
          <Grid item xs={12}>
           <TextField autoComplete="name" variant="outlined" required fullWidth name={name} onChange={(e) => { setName(e.target.value) }} label="Name" />
          </Grid>
          <Grid item xs={12}>
           <TextField autoComplete="email" variant="outlined" required fullWidth name={email} onChange={(e) => { setEmail(e.target.value) }} label="Email Address" />
          </Grid> 
          <Grid item xs={12}>
           <TextField autoComplete="phone" variant="outlined" required fullWidth name={phone} onChange={(e) => { setPhone(e.target.value) }} label="Phone" />
          </Grid>
          <Grid item xs={12}>
           <TextField autoComplete="gender" variant="outlined" required fullWidth name={gender} onChange={(e) => { setGender(e.target.value) }} label="Gender"/>
          </Grid>
         </Grid>
         <Box m={3} textAlign="center">
          <Button type="button" variant="contained" color="primary"   onClick={updateEmployee}> Update </Button>
         </Box>
        </form>
        <Box m={3} textAlign="center">
         <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
        </Box>
       </Grid>
      </Grid > */}
    </>
  );
};

export default Edit;
