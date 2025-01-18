import React, { useState, useEffect } from "react";
import styles from "./Album.module.css";
import { AddAlbum } from "./AddAlbum";
import { db } from "../FireBase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ImageDashboard } from "./ImageRoute";

export const AlbumDashboard = () => {
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [button, setButton] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const addAlbum = () => {
    setShowAddAlbum(true);
    setButton(true);
  };

  const clickImage = (album) => {
    setSelectedAlbum(album);
  };

  const goBack = () => {
    setSelectedAlbum(null);
  };

  const deleteAlbum = async (albumId) => {
    try {
      const albumDocRef = doc(db, "Albums", albumId);
      await deleteDoc(albumDocRef);
      setAlbums(albums.filter((album) => album.id !== albumId));
    } catch (error) {
      console.error("Error deleting album: ", error);
    }
  };

  useEffect(() => {
    const albumsRef = collection(db, "Albums");
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
    <div className={styles.pageContainer}>
      {selectedAlbum ? (
        <ImageDashboard album={selectedAlbum} goBack={goBack} />
      ) : (
        <div>
          <nav className={styles.nav}>
            <div className={styles.navbarContainer}>
              <h1 className={styles.logo}>PhotoFolio</h1>
              <ul className={styles.navLinks}>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </nav>

          <main className={styles.mainContent}>
            <header className={styles.header}>
              <div className={styles.heading}>
                <h2>Welcome to PhotoFolio</h2>
                <p>Organize and cherish your memories with ease.</p>
              </div>
              {!button && (
                <button onClick={addAlbum} className={styles.addBtn}>
                  Add New Album
                </button>
              )}
            </header>

            {showAddAlbum && (
              <AddAlbum
                setShowAddAlbum={setShowAddAlbum}
                setButton={setButton}
              />
            )}

            <section className={styles.albumSection}>
              <h3>Your Photo Albums</h3>
              <div className={styles.albumsGrid}>
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className={styles.albumCard}
                    onClick={() => clickImage(album)}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={
                          album.img ||
                          "https://img.icons8.com/ios-filled/50/000000/picture.png"
                        }
                        alt={album.name}
                        className={styles.albumImage}
                      />
                      <div className={styles.overlay}>
                        <p className={styles.albumName}>{album.name}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the album click
                            deleteAlbum(album.id);
                          }}
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
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p>&copy; 2025 PhotoFolio. All rights reserved.</p>
              <ul className={styles.footerLinks}>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};
