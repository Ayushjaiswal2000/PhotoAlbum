import React, { useState, useEffect } from "react";
import styles from "./ImageRoute.module.css"; // Use module CSS
import { db } from "../FireBase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { AddImage } from "./AddImage";

export const ImageDashboard = ({ album, goBack }) => {
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

  const deleteImage = async (imageId, e) => {
    e.stopPropagation(); // Prevent triggering the album click
    try {
      const imageDocRef = doc(db, "Images", imageId);
      await deleteDoc(imageDocRef);
      setImages(images.filter((image) => image.id !== imageId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
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
            <svg
              className={styles.backIcon}
              width="100"
              height="50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, 12)" /* Adds a top margin of 5px */
              />
              <text
                x="20"
                y="17"
                font-size="13"
                fill="white"
                font-family="Arial, sans-serif"
                transform="translate(0, 12)" /* Adds a top margin of 5px */
              >
                Back
              </text>
            </svg>
          </button>
          <h1>PhotoFolio</h1>
        </div>
      </nav>

      <div className={styles.container}>
        <header>
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
                <div
                  key={image.id}
                  className={styles.album}
                  onClick={() => openImage(image)}
                >
                  <p>{image.name}</p>
                  <img
                    src={
                      image.img ||
                      "https://img.icons8.com/ios-filled/50/000000/picture.png"
                    }
                    alt={image.name}
                  />
                  <button
                    onClick={(e) => deleteImage(image.id, e)} // Pass correct imageId and stop propagation
                    className={styles.deleteBtn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 6.793l2.646-2.647a.5.5 0 0 1 .708.708L8.707 7.5l2.647 2.646a.5.5 0 0 1-.708.708L8 8.207l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 7.5 4.646 4.854a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
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
