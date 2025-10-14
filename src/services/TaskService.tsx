import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // importa a instância do Firestore
import { Task } from "../types/Task";

const COLLECTION_NAME = "tasks";

// ✅ Helper para pegar o ID do usuário autenticado
function getUserId(): string {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return user.uid;
}

// ✅ Criar tarefa associada ao usuário logado
export async function createTask(name: string): Promise<void> {
  const userId = getUserId();

  await addDoc(collection(db, COLLECTION_NAME), {
    userId,
    name,
    done: false,
    deleted: false,
    createdAt: new Date(),
  });
}

// ✅ Buscar apenas tarefas do usuário logado
export async function getAllTasks(): Promise<Task[]> {
  const userId = getUserId();

  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Task[];
}

// ✅ Atualizar tarefa (nome, done, etc)
export async function updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
  const ref = doc(db, COLLECTION_NAME, taskId);
  await updateDoc(ref, updates);
}
