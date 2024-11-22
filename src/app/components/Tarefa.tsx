"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import TarefaType, { removeTarefa } from "../services/tarefa";
import { UsuarioType } from "../services/usuario";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import SheetComponent from "./sheetTarefa";
import SheetEdit from "./sheetEdit";
import SheetUsuarioComponent from "./sheetUser";

type Props = {
    tarefas: TarefaType[];
    tarefa: TarefaType;
    user: UsuarioType;
    users: UsuarioType[];
};

export default function Tarefa({ tarefas, tarefa: novaTarefa, users, user: novoUser }: Props) {
    const [tarefa, setTarefa] = useState<TarefaType>(novaTarefa);
    const [tarefaParaEditar, setTarefaParaEditar] = useState<TarefaType | null>(null);

    const tarefasAFazer = tarefas.filter((tarefa) => tarefa.status === "aFazer");
    const tarefasProcessando = tarefas.filter((tarefa) => tarefa.status === "processando");
    const tarefasConcluido = tarefas.filter((tarefa) => tarefa.status === "concluido");

    
    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Kanban</h1>
                <div className="grid grid-cols-3 gap-6">
                    {/* Coluna A Fazer */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">A Fazer</h2>
                        <ScrollArea>
                            <div className="space-y-4">
                                {tarefasAFazer.map((tarefa) => (
                                    <div
                                        key={tarefa.id}
                                        className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                    >
                                        <button
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                            title="Excluir"
                                            onClick={() => removeTarefa(tarefa)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="absolute top-2 right-10 text-blue-500 hover:text-blue-600"
                                            title="Editar"
                                            onClick={() => setTarefaParaEditar(tarefa)}
                                        >
                                             <SheetEdit tarefa={tarefa}/>
                                        </button>
                                        <h3 className="font-semibold text-gray-800">{tarefa.titulo}</h3>
                                        <p className="text-sm text-gray-600">{tarefa.descricao}</p>
                                        <p className="text-xs font-medium mt-2 text-gray-500">
                                            Prioridade: {tarefa.prioridade}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Coluna Processando */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">Processando</h2>
                        <div className="space-y-4">
                            {tarefasProcessando.map((tarefa) => (
                                <div
                                    key={tarefa.id}
                                    className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <button
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                        title="Excluir"
                                        onClick={() => removeTarefa(tarefa)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="absolute top-2 right-10 text-blue-500 hover:text-blue-600"
                                        title="Editar"
                                        onClick={() => setTarefaParaEditar(tarefa)}
                                    >
                                       <SheetEdit tarefa={tarefa}/>
                                    </button>
                                    <h3 className="font-semibold text-gray-800">{tarefa.titulo}</h3>
                                    <p className="text-sm text-gray-600">{tarefa.descricao}</p>
                                    <p className="text-xs font-medium mt-2 text-gray-500">
                                        Prioridade: {tarefa.prioridade}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna Concluído */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">Concluído</h2>
                        <div className="space-y-4">
                            {tarefasConcluido.map((tarefa) => (
                                <div
                                    key={tarefa.id}
                                    className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                                >
                                    <button
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                                        title="Excluir"
                                        onClick={() => removeTarefa(tarefa)}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="absolute top-2 right-10 text-blue-500 hover:text-blue-600"
                                        title="Editar"
                                        onClick={() => setTarefaParaEditar(tarefa)}
                                    >
                                        <SheetEdit tarefa={tarefa}/>
                                    </button>
                                    <h3 className="font-semibold text-gray-800">{tarefa.titulo}</h3>
                                    <p className="text-sm text-gray-600">{tarefa.descricao}</p>
                                    <p className="text-xs font-medium mt-2 text-gray-500">
                                        Prioridade: {tarefa.prioridade}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botões Fixos */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    <SheetUsuarioComponent usuario={novoUser}/>
                </div>
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition">
                    <SheetComponent tarefas={tarefas} tarefa={tarefaParaEditar || tarefa} />
                </div>
            </div>
        </div>
    );
}
