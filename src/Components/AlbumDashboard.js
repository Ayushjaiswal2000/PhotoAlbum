import React, { useState } from "react";
import styles from "./AlbumDashboard.module.css"; // Use module CSS

export const AlbumDashboard = () => {
    const [showAddAlbum, setShowAddAlbum] = useState(false);
    const [button,setButton]=useState(false);

   
    const addAlbum = () => {
        setShowAddAlbum(true);
        setButton(true);
        
        
    };

    const close = () => {
        setShowAddAlbum(false);
        setButton(false);
    };

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

                {showAddAlbum && (
                    <div className={styles.createAlbum}>
                        
                        <button
                            className={styles.cancelBtn}
                            onClick={close} // Close the form
                        >
                            &times; {/* Cross symbol */}
                        </button>
                        <span>Add Album</span>
                        <input
                            type="text"
                            placeholder="Album Name"
                            className={styles.createAlbumInput}
                        />
                         <div className={styles.buttonGroup}>
                            <button className={styles.clearBtn}>Clear</button>
                            <button className={styles.createBtn}>Create</button>
                        </div>
                        
                       
                    </div>
                )}

                <div className={styles.albumContainer}>
                    <div className={styles.albumTitle}>Your Albums</div>

                    <div className={styles.albumsGrid}>
                        <div className={styles.album}>
                            <img
                                src="https://img.icons8.com/ios-filled/50/000000/picture.png"
                                alt="Album"
                            />
                            <p>Album 1</p>
                        </div>
                        <div className={styles.album}>
                            <img
                                src="https://img.icons8.com/ios-filled/50/000000/picture.png"
                                alt="Album"
                            />
                            <p>Album 2</p>
                        </div>
                        <div className={styles.album}>
                            <img
                                src="https://img.icons8.com/ios-filled/50/000000/picture.png"
                                alt="Album"
                            />
                            <p>Album 3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
