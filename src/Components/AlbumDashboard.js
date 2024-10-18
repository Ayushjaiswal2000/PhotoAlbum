import React, { useState } from "react";
import styles from "./Album.module.css"; // Use module CSS
import { AddAlbum } from "./AddAlbum";
import { db } from "../FireBase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const AlbumDashboard = () => {
    const [showAddAlbum, setShowAddAlbum] = useState(false);
    const [button,setButton]=useState(false);
    const [albums, setAlbums] = useState([]);

   
    const addAlbum = () => {
        setShowAddAlbum(true);
        setButton(true);
        
        
    };

    useEffect(() => {
        const albumsRef = collection(db, "Albums"); // Reference to the Albums collection
        const unsubscribe = onSnapshot(albumsRef, (snapshot) => {
            const updatedAlbums = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAlbums(updatedAlbums); 
        });
    
        
        return () => unsubscribe();
    }, []);

   

    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.navbarContainer}>
                    <h1>Photo Album Manager</h1>
                </div>
            </nav>

            <div className={styles.container}>
                <header>
                    <div className={styles.logo}>PhotoFolio</div>
                   {!button && <button onClick={addAlbum} className={styles.addBtn}>Add Album</button>} 
                </header>

                {showAddAlbum && <AddAlbum setShowAddAlbum={setShowAddAlbum}  setButton={setButton} />
                    
                }

                <div className={styles.albumContainer}>
                    <div className={styles.albumTitle}>Your Albums</div>

                    <div className={styles.albumsGrid}>
                        
                        {albums.map((album) => (
                            <div key={album.id} className={styles.album}>
                                <p>{album.name}</p>
                                <img
                                    src={album.img || "https://img.icons8.com/ios-filled/50/000000/picture.png"}
                                    alt={album.name}
                                />
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
