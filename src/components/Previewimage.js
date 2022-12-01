import React, {useState} from 'react'

const Previewimage = () => {
    const [preview,setPreview] = useState(null)

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () =>{
        setPreview(reader.result)
    }
    
  return (
    <div>
      <img src={preview} alt="preview"/>
    </div>
  )
}

export default Previewimage
