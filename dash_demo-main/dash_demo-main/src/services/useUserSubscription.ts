import { useAuthContext } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebaseClient';
import { FirebaseApp } from 'firebase/app';
import useGetUser from "./useGetUser";

interface UserSubscriptionData {
  email: string
  expiry_date: Date
  subscription: string
  tx_ref: string
  uid: string
  verified: boolean
}

const useUserSubscription = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<UserSubscriptionData>();
  const [isLoading, setLoading] = useState(true);
  const { isLoading: userAccountDataLoading, userAccountData } = useGetUser()

  useEffect(() => {
    if (user && userAccountData) { 
      const fetchUserSubscription = async () => {
        const userId = userAccountData.role == "Student" ? userAccountData.parentId : user.uid;
        const db = getFirestore(firebase_app as FirebaseApp);
        const userSubscriptionsRef = doc(db, "UserSubscriptions", userId);

        try {
          const docSnap = await getDoc(userSubscriptionsRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const userFetchedData: UserSubscriptionData = {
              email: data.email,
              expiry_date: data.expiry_date.toDate(),
              subscription: data.subscription,
              tx_ref: data.tx_ref,
              uid: data.uid,
              verified: data.verified
            }
            setUserData(userFetchedData);
          } else {
            setUserData(undefined);
          }
        } catch (error) {
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
  }, [user, userAccountData]); 

  return { userData, isLoading };
};

export default useUserSubscription;
