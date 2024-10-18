import React, { useEffect } from "react";
import styles from "./Album.module.css"
import { useState } from "react";
import { db } from "../FireBase";
import { doc,collection, onSnapshot,addDoc } from "firebase/firestore";


 export const AddAlbum=({setShowAddAlbum,setButton})=>{

    const [albumName, setAlbumName] = useState("");
     const [albums, setAlbums] = useState([]);

    const close = () => {
        setShowAddAlbum(false);
        setButton(false);
    };

    const handleInputChange = (e) => {
        setAlbumName(e.target.value); 
    };

    const clearInput = () => {
        setAlbumName(""); 
    };

   const  addAlbumToDb = async ()=>{
    if(albumName.trim()){
        try{

            const albumRef = collection(db,'Albums');
             await addDoc(albumRef,{
                img:"https://img.icons8.com/ios-filled/50/000000/picture.png",
                name: albumName
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
                        <span className={styles.headingSpan}>Add Album</span>
                        <input
                            type="text"
                            placeholder="Album Name"
                            value={albumName}
                            className={styles.createAlbumInput}
                            onChange={handleInputChange}
                        />
                         <div className={styles.buttonGroup}>
                            <button onClick={clearInput}className={styles.clearBtn}>Clear</button>
                            <button  onClick={addAlbumToDb}className={styles.createBtn}>Create</button>
                        </div>
                        
                       
                    </div>

</>)

}