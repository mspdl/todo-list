import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { TaskList } from "./pages/TaskList";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);

  if (!user) return <Login />;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
}
