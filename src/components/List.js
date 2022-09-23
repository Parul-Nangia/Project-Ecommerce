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


//=================================================employee listing (GET API)================================================================================
const List = () => {
    const classes = useStyles();
    const [employs,setEmploys] = useState([]);
    
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
//=================================================employee listing================================================================================


    



//=================================================employee delete================================================================================   
    function deleteEmployee(_id)
    {
        if(window.confirm("Are you sure you want to to delete",_id))
        {
            fetch(`http://localhost:1999/employee/${_id}`,{
                method:'DELETE',
                headers:{ 
                    'Accept':'application/json',
                    'Content-Type':'application/json'
            }
            })
            console.log("Employee Deleted",_id)
        }
    }
//=================================================employee delete================================================================================






return (
    
  <>
    <Box textAlign="center" p={2} className={classes.empListColor}>
        <Typography variant="h5" className={classes.empListColor}>EMPLOYEE LIST</Typography>
    </Box>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow style={{ backgroundColor: "#DCDCDC" }}>
                    {/* <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell> */}
                    <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Phone</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Gender</TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
      
            {employs.map((item,i) => {
                return(
                    <TableRow key ={i}> 
                        {/* <TableCell align="center">{item._id}</TableCell> */}
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.phone}</TableCell>
                        <TableCell align="center">{item.gender}</TableCell> 
                        <TableCell align="center">
                            <Tooltip title="View">
                                <IconButton><Link to={`/view/${item._id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton><Link to={`/edit/${item._id}`} ><EditIcon /></Link></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton ><DeleteIcon color="secondary" /></IconButton>
                            </Tooltip>  
                        </TableCell>
                    </TableRow>
                 
                )
                })
            }


       

            </TableBody>
        </Table>
    </TableContainer>
  </>
 )
}

 
export default List

// onClick={() => selectEmployee(item._id)}