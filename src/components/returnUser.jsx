import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const returnUser = async (userId) => {
    try {
        const userRef = doc(db, "Users", userId);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.error ("No such user!");
            return null;
        }
    }  catch (error) {
        console.error(`Error fetching user: ${error}`)
        throw error;
    }
}

export default returnUser;
