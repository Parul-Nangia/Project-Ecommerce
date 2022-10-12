import React from 'react';
import { Dialog } from 'antd';
import { InputText } from 'antd';
import profile from './UserProfile';
import { useState } from 'react';

const Profile=()=>{
    const [image,setImage]=useState("");
    const [imagecrop,setimagecrop]=useState(false);
    const[src,setsrc]=useState(false);
    const[profile,setProfile]=useState([]);
    const[pview,setpview]=useState(false)

    const profileFinal=profile.map((item)=>item.pview);

    const onClose=()={
        setpview(null);
    };

    const onCrop=(view)={
        setpview(view);

    };

    const saveCropImage=()={
        setProfile([...profile,{pview}]);
        setimagecrop(false);
    }


    return(
        <div className='ppp'>
            <div className='rrr'>
                <img
                style={{
                    width:"200px",
                    height:"200px",
                    borderRadius:"50%",
                    objectFit:"cover",
                    border:"4px solid green"
                }}
                src={profile} alt=""/>
                <label htmlFor='' className='hhhh'>Hello</label>

    <Dialog 
    visible={imagecrop}
                  header={()=>{
                    <p  htmlFor="" className='hjdsjsh'>
                        Update Profile
                    </p>
                  }}
                  onHide={()=>setimagecrop(false)}
    >

    </Dialog>


                <InputText
                type="file"
                accept='/image/*'
                onChange={(event)=>{
                    const file = event.target.files[0];
                    if(file && file.type.substring(0,5)==="image"){
                        setImage(file);
                    }else{
                        setimage(null)
                    }

                }}

                />
            </div>
        </div>
    )
}