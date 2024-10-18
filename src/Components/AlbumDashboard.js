import React from "react";
import styles from "./AlbumDashboard.module.css"; // Use module CSS

export const AlbumDashboard = () => {
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
                    <button className={styles.addBtn}>Add Album</button> 
                </header>

                

                {/* <div className={styles.createAlbum}>
                    <input
                        type="text"
                        placeholder="Album Name"
                        className={styles.createAlbumInput}
                    />
                    <button className={styles.clearBtn}>Clear</button>
                    <button className={styles.createBtn}>Create</button>
                </div> */}

                {/* <button className={styles.cancelBtn}>Cancel</button> */}

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
