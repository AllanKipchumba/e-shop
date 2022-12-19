import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

export const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //FETCH DATA FROM FIRESTORE COLLECTION
  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      //listen for real time updates
      onSnapshot(q, (snapshot) => {
        //extracting the data
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        // console.log(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  //call getCollection when component mounts
  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};
