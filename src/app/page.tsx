import Tarefa from "./components/Tarefa";
import { getTarefas, getEmptyTarefa } from "@/app/services/tarefa";
import { getEmptyUsuario, getUsuarios } from "./services/usuario";
export const dynamic = "force-dynamic";

export default async function Home() {
  const tarefas = await getTarefas();
  const tarefa = await getEmptyTarefa();

  const user = await getEmptyUsuario()

  const users = await getUsuarios()

  console.log(tarefas)

  return <Tarefa tarefas={tarefas} tarefa={tarefa} user={user} users={users} />;
}
