import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
// import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
// import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
 empListColor: {
  backgroundColor: "#87CEFA",
  color: "#000000",
  textAlign: "center",
  marginTop: "30px",
  fontWeight: "bold"
 },
 tableHeadCell: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 16
 },
})

const List = () => {
    const classes = useStyles();
    const [employs,setEmploys] = useState([]);  // Form data will get save in state
        const fetchData =()=>{
            fetch("http://localhost:1999/employee")
            
            .then((response)=>{
                return response.json();
            }).then((data)=>{
                
                let emp = data.employeeData
                

                setEmploys(emp)
            })
      
        }
        useEffect(()=>{
            fetchData();
      
        },[])







 return (
    
  <>
    <Box textAlign="center" p={2} className={classes.empListColor}>
        <Typography variant="h5" className={classes.empListColor}>Employee List</Typography>
    </Box>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow style={{ backgroundColor: "#DCDCDC" }}>
                    <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Phone</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Gender</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
      
            {employs.map((data,i) => {
                return(
                    <TableRow key ={i}> 
                        <TableCell align="center">{i+1}</TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">{data.email}</TableCell>
                        <TableCell align="center">{data.phone}</TableCell>
                        <TableCell align="center">{data.gender}</TableCell> 
                        <TableCell align="center">
                            <Tooltip title="View">
                                <IconButton><Link to={"/view/"}><VisibilityIcon color="primary" /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton><Link to={"/edit/"}><EditIcon /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton ><DeleteIcon color="secondary" /></IconButton>
                            </Tooltip>  
                        </TableCell>
                    </TableRow>
                 
                )
                })
            }

{/* onClick={() => handleDelete(data.id)} */}
       

            </TableBody>
        </Table>
    </TableContainer>
  </>
 )
}

 
export default List

{/* // {`/view/${employs.id}`} */}