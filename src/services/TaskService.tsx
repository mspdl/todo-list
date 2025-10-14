import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Task } from "../types/Task";

function getUserId(): string {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return user.uid;
}

export async function createTask(name: string): Promise<void> {
  const userId = getUserId();
  const tasksCollection = collection(db, "users", userId, "tasks");

  await addDoc(tasksCollection, {
    name,
    done: false,
    deleted: false,
    createdAt: new Date(),
  });
}

export async function getAllTasks(): Promise<Task[]> {
  const userId = getUserId();
  const tasksCollection = collection(db, "users", userId, "tasks");
  const snapshot = await getDocs(tasksCollection);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Task[];
}

export async function updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<void> {
  const userId = getUserId();
  const taskRef = doc(db, "users", userId, "tasks", taskId);
  await updateDoc(taskRef, updates);
}
