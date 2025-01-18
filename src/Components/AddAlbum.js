import React, { useEffect } from "react";
import styles from "./AddAlbum.module.css";
import { useState } from "react";
import { db } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";

export const AddAlbum = ({ setShowAddAlbum, setButton }) => {
  const [albumName, setAlbumName] = useState("");
  const [image, setImage] = useState(null);

  const close = () => {
    setShowAddAlbum(false);
    setButton(false);
  };

  const handleInputChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Store image as Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const clearInput = () => {
    setAlbumName("");
    setImage(null);
  };

  const addAlbumToDb = async () => {
    if (albumName.trim() && image) {
      try {
        const albumRef = collection(db, "Albums");
        await addDoc(albumRef, {
          img: image, // Store the Base64 image or URL
          name: albumName,
        });
        clearInput();
      } catch (error) {
        console.log("Some Error is there: " + error);
      }
    } else {
      console.log("Album name and image are required");
    }
  };

  return (
    <>
      <div className={styles.overlay} /> {/* Modal background */}
      <div className={styles.createAlbum}>
        <button className={styles.cancelBtn} onClick={close}>
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
        <div className={styles.imageInputContainer}>
          <label htmlFor="imageUpload" className={styles.imageInputLabel}>
            Upload Album Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className={styles.imageInput}
            onChange={handleImageChange}
          />
          <span className={styles.imageInputNote}>
            Accepted formats: JPG, PNG, GIF (max size: 5MB)
          </span>
        </div>
        {image && (
          <div className={styles.preview}>
            <img src={image} alt="Preview" className={styles.previewImage} />
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button onClick={clearInput} className={styles.clearBtn}>
            Clear
          </button>
          <button onClick={addAlbumToDb} className={styles.createBtn}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};
