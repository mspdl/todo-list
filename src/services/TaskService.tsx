import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Task } from "../types/Task";

const currentDate = new Date().toISOString();
const collectionName = "tasks";
const tasksCollection = collection(db, collectionName);

export async function createTask(title: string): Promise<Task> {
  const newTask = {
    name: title,
    done: false,
    created: currentDate,
    deleted: false,
  };

  const docRef = await addDoc(tasksCollection, newTask);
  return {
    id: docRef.id,
    name: title,
    done: newTask.done,
    created: currentDate,
    deleted: false,
  };
}

export async function getAllTasks(): Promise<Task[]> {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
}

export async function updateTask(
  id: string,
  updatedData: Partial<Omit<Task, "id">>
): Promise<void> {
  updatedData = { ...updatedData, updated: currentDate };
  const taskDoc = doc(db, collectionName, id);
  await updateDoc(taskDoc, updatedData);
}
