import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file) => {
  const fileName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(storage, `images/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL; // Returns the URL to access the image
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};


