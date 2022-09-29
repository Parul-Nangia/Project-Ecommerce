import React from 'react';
import "./featured.css"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () =>{
    return(
        <div className='featured'>
            <div className='top'>
                <h1 className='title'>Progress</h1>
                <MoreVertIcon fontSize="small"/>
            </div>
            <div className='bottom'>
                <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={9}/>
                </div>
                <p className="title">Total Tasks</p>
                <p className='amount'>Progress</p>
                <p className='desc'>
                    Previous Tasks Processing.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                            <div className="itemResult">
                                <div className="resultAmount">

                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Featured