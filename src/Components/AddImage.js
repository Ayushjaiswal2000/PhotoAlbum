import React, { useEffect } from "react";
import styles from "./Album.module.css"
import { useState } from "react";
import { db } from "../FireBase";
import { doc,collection, onSnapshot,addDoc } from "firebase/firestore";


 export const AddImage=({setShowAddImage,setButton,album})=>{

    const [ImageName, setImageName] = useState("");
    const [ImageURL, setImageURL] = useState("");
     const [Images, setImages] = useState([]);

    const close = () => {
        setShowAddImage(false);
        setButton(false);
    };

    const handleInputChangeName = (e) => {
        setImageName(e.target.value); 
    };

    const handleInputChangeURL=(e)=>{
        setImageURL(e.target.value);
    }

    const clearInput = () => {
        setImageName(""); 
        setImageURL("");
    };

   const  addImageToDb = async ()=>{
    if(ImageName.trim() && ImageURL.trim()){
        try{

            const imageRef = collection(db,'Images');
             await addDoc(imageRef,{
                albumId:album.id,
                img:ImageURL,
                name: ImageName
             });
             clearInput();
             

        }catch(error){
            console.log("Some Error is there" + error);
        }
    }else{console.log("Album name is Required");}
    
   }

 
return(<>


<div className={styles.createAlbum}>
                        
                        <button
                            className={styles.cancelBtn}
                            onClick={close} // Close the form
                        >
                            &times; 
                        </button>
                        <span className={styles.headingSpan}>Add Image to {album.name}</span>
                        <input
                            type="text"
                            placeholder="Image Name"
                            value={ImageName}
                            className={styles.createAlbumInput}
                            onChange={handleInputChangeName}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={ImageURL}
                            className={styles.createAlbumInput}
                            onChange={handleInputChangeURL}
                        />
                         <div className={styles.buttonGroup}>
                            <button onClick={clearInput}className={styles.clearBtn}>Clear</button>
                            <button  onClick={addImageToDb}className={styles.createBtn}>Add</button>
                        </div>
                        
                       
                    </div>

</>)

}