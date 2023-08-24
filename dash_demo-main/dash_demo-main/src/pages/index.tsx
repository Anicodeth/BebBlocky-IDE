import { useAuthContext } from "@/components/AuthContext";
import nookies from "nookies";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import admin from "@/lib/firebaseAdmin";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import ChildrenList from "@/components/children-list";
import firebase_app from "@/lib/firebaseClient";
import type { Student, User } from "@/lib/shape";
import TopBar from "@/components/topbar";
import { CreateStudentDialog } from "@/components/create-student-dialog";



interface Props {
  is_parent?: boolean;
  students?: Student[];
}

const Home: NextPage = ({ is_parent, students }: Props) => {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>BeBlocky Dashboard</title>
        <meta name="description" content="Welcome to BeBlocky Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container grid items-center gap-4 pb-4 pt-2 md:py-5">
        <TopBar name={user?.displayName as string} />
        <h1 className="text-2xl font-semibold tracking-tight text-dark-ebony">Children</h1>
        <ChildrenList students={students}>
          <CreateStudentDialog id={user?.uid as string} is_parent={is_parent as boolean} />
        </ChildrenList>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await admin.auth().verifyIdToken(cookies.token || "");

    if (!token) {
      return {
        redirect: {
          destination: "/register",
          permanent: false,
        },
      };
    }
    const { uid } = token;
    const db = firebase_app ? getFirestore(firebase_app) : undefined;
    if (db) {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        if (user.role === "parent") {
          const studentsRef = collection(db, "School", uid, "Classes", "Class A", "Students");
          const studentsSnap = await getDocs(studentsRef);
          const students = studentsSnap.docs.map((doc) =>
            ({ ...doc.data() } as Student)
          );
          return {
            props: {
              students,
              is_parent: true,
            },
          };
        }
      }
    }

    return {
      props: {},
    };
  } catch (error) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the register page
    ctx.res.writeHead(302, { Location: '/register' });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
}

export default Home;
