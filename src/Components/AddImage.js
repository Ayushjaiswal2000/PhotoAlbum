import React, { useState } from "react";
import styles from "./AddImage.module.css";
import { db } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";

export const AddImage = ({ setShowAddImage, setButton, album, setAlbums }) => {
  const [ImageName, setImageName] = useState("");
  const [image, setImage] = useState(null); // Store image as base64
  const [ImageURL, setImageURL] = useState("");

  const close = () => {
    setShowAddImage(false);
    setButton(false);
  };

  const handleInputChangeName = (e) => {
    setImageName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Store image as Base64 string
        setImageURL(reader.result); // Update URL state for Firebase upload (if needed)
      };
      reader.readAsDataURL(file);
    }
  };

  const clearInput = () => {
    setImageName("");
    setImage(null);
    setImageURL(""); // Clear image URL state as well
  };

  const addImageToDb = async () => {
    if (ImageName.trim() && image) {
      try {
        const imageRef = collection(db, "Images");
        await addDoc(imageRef, {
          albumId: album.id,
          img: image, // Store Base64 image string
          name: ImageName,
        });

        // Optionally, add image info to local albums state for instant UI update
        setAlbums((prevAlbums) => [
          ...prevAlbums,
          {
            id: album.id,
            name: ImageName,
            img: image, // Base64 image or image URL
          },
        ]);

        clearInput(); // Clear inputs after successful submission
      } catch (error) {
        console.log("Error while adding image to the database: " + error);
      }
    } else {
      console.log("Image name and image are required.");
    }
  };

  return (
    <>
      <div className={styles.createImage}>
        <button className={styles.cancelBtn} onClick={close}>
          &times;
        </button>
        <span className={styles.headingSpan}>Add Image to {album.name}</span>

        <input
          type="text"
          placeholder="Image Name"
          value={ImageName}
          className={styles.createImageInput}
          onChange={handleInputChangeName}
        />

        <div className={styles.imageInputContainer}>
          <label htmlFor="imageUpload" className={styles.imageInputLabel}>
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className={styles.imageInput}
            onChange={handleImageChange}
          />
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
          <button onClick={addImageToDb} className={styles.createBtn}>
            Add
          </button>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
};
