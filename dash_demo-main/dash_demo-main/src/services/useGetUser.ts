import firebase_app from "@/lib/firebaseClient";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { DocumentData, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

function useGetUser(user: User) {
  const [ userData, setUserData ] = useState<DocumentData>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>("");
  const [ requested, setRequested ] = useState<boolean>(false);
  const [ hasPaid, setPaid ] = useState<boolean>(false);
  const [ userPackage, setPackage ] = useState<string>("");
  const [txRef, setTxRef] = useState<string>("");


  const db = getFirestore(firebase_app as FirebaseApp);
  const userRef = doc(db, 'users', user.uid);
  
  const getUserData = async() => {  
    setIsLoading(true);
    setRequested(true);
  getDoc(userRef)
    .then((doc) => {
      setIsLoading(false);
      if (doc.exists()) {
        setPaid(doc.data().pendingPaymentRef == null);
        setPackage(doc.data().userPackage);
        setUserData(doc.data());
        setTxRef(doc.data().pendingPaymentRef);
        console.log(doc.data().userPackage, doc.data().pendingPaymentRef);
      } else {
          setError("Couldn't get your data. Try again.");
        }
    }
  ).catch((error) => {
      setIsLoading(false);
  console.log(error);
        setError(error);
    }); 
  }

  return {
    getUserData,
    userData,
    isLoading,
    error,
    requested,
    hasPaid,
    userPackage,
    txRef
  }
}

export default useGetUser
