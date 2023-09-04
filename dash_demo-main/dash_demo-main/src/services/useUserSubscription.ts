import { useAuthContext } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';
import firebase_app from '@/lib/firebaseClient';
import { FirebaseApp } from 'firebase/app';

const useUserSubscription = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<DocumentData>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserSubscription = async () => {
        const db = getFirestore(firebase_app as FirebaseApp);
        const userSubscriptionsRef = doc(db, "UserSubscriptions", user.uid);

        try {
          const docSnap = await getDoc(userSubscriptionsRef);
          console.log('here', docSnap.data());

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData(undefined);
          }
        } catch (error) {
          console.error("Error fetching user subscription:", error);
          setUserData(undefined);
        } finally {
          setLoading(false);
        }
      };

      fetchUserSubscription();
    } else {
      setLoading(false);
      setUserData(undefined);
    }
  }, [user]); 

  return { userData, isLoading };
};

export default useUserSubscription;
