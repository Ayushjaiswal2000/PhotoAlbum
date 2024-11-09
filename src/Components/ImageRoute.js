import React, { useState, useEffect } from "react";
import styles from "./Album.module.css"; // Use module CSS
import { db } from "../FireBase";
import { collection, onSnapshot } from "firebase/firestore";
import { AddImage } from "./AddImage";

export const ImageDashboard = ({ album , goBack}) => {
    const [showAddImage, setShowAddImage] = useState(false);
    const [button, setButton] = useState(false);
    const [images, setImages] = useState([]);

    const [zoomedImage, setZoomedImage] = useState(null);

    const openImage = (image) => {
        setZoomedImage(image);
    };

    const closeImage = () => {
        setZoomedImage(null);
    };


    const addImage = () => {
        setShowAddImage(true);
        setButton(true);
    };

    useEffect(() => {
        const albumsRef = collection(db, "Images"); // Reference to the Images collection
        const unsubscribe = onSnapshot(albumsRef, (snapshot) => {
            const updatedImages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setImages(updatedImages);
        });
    
        return () => unsubscribe();
    }, []);

    // Filter the images based on the current album ID
    const filteredImages = images.filter((image) => album?.id === image.albumId);

    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.navbarContainer}>
                
                <button onClick={goBack} className={styles.back_button}>
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ marginTop: 0 }}>Back</span>
        </button>
                    <h1>Photo Album Manager</h1>
                </div>
            </nav>

            <div className={styles.container}>
                <header>
                    <div className={styles.logo}>PhotoFolio</div>
                    {!button && (
                        <button onClick={addImage} className={styles.addBtn}>
                            Add Image
                        </button>
                    )}
                </header>

                {showAddImage && (
                    <AddImage 
                        setShowAddImage={setShowAddImage}  
                        setButton={setButton} 
                        album={album} 
                    />
                )}

                <div className={styles.albumContainer}>
                    <div className={styles.albumTitle}>Your Images</div>

                    <div className={styles.albumsGrid}>
                    {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                    <div key={image.id} className={styles.album} onClick={() => openImage(image)}>
                        <p>{image.name}</p>
                        <img
                            src={image.img || "https://img.icons8.com/ios-filled/50/000000/picture.png"}
                            alt={image.name}
                        />
                    </div>
                ))
            ) : (
                <p>No images found.</p>
            )}


{zoomedImage && (
                <div className={styles.overlay} onClick={closeImage}>
                    <img
                        src={zoomedImage.img}
                        alt={zoomedImage.name}
                        className={styles.zoomedImage}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
                    />
                </div>
            )}
    
                    </div>
                </div>
            </div>
        </div>
    );
};
