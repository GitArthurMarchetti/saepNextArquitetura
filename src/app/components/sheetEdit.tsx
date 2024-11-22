'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import TarefaType, { saveTarefa } from "../services/tarefa"
import { useState } from "react";

type Props = {
    tarefa: TarefaType;
};

export default function SheetEdit({ tarefa: novaTarefa }: Props) {
    const [tarefa, setTarefa] = useState<TarefaType>(novaTarefa);

    return (
        <Sheet>
            <SheetTrigger>
                Editar
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Criar Tarefa</SheetTitle>
                    <SheetDescription className="text-gray-600">
                        Crie sua tarefa e coloque tudo em dia!
                    </SheetDescription>
                </SheetHeader>

                <form action={saveTarefa} className="space-y-4 mt-6">
                    <input
                        type="hidden"
                        name="id"
                        value={`${tarefa?.id}`}
                        className={`${tarefa.id ? 'border-2 border-yellow-500' : 'border-2 border-blue-500'}`}
                    />

                    {/* Input para Título */}
                    <div>
                        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Título da Tarefa"
                            value={tarefa.titulo}
                            onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
                        />
                    </div>

                    {/* Input para Descrição */}
                    <div>
                        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Descrição da Tarefa"
                            value={tarefa.descricao}
                            onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
                        />
                    </div>

                    {/* Select para Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="w-full p-2 border rounded-md text-black"
                            value={tarefa.status}
                            onChange={(e) => setTarefa({ ...tarefa, status: e.target.value as "aFazer" | "processando" | "concluido" })}
                        >
                            <option value="aFazer">A Fazer</option>
                            <option value="processando">Processando</option>
                            <option value="concluido">Concluído</option>
                        </select>
                    </div>

                    {/* Select para Prioridade */}
                    <div>
                        <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">
                            Prioridade
                        </label>
                        <select
                            id="prioridade"
                            name="prioridade"
                            className="w-full p-2 border rounded-md text-black"
                            value={tarefa.prioridade}
                            onChange={(e) => setTarefa({ ...tarefa, prioridade: e.target.value as "BAIXA" | "MEDIA" | "ALTA" })}
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="nomeSetor" className="block text-sm font-medium text-gray-700">
                            Nome do setor 
                        </label>
                        <input
                            type="text"
                            id="nomeSetor"
                            name="nomeSetor"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Nome do Setor"
                            value={tarefa.nomeSetor}
                            onChange={(e) => setTarefa({ ...tarefa, nomeSetor: e.target.value as string })}
                        />
                    </div>


                    {/* Input para Nome do Usuário */}
                    <div>
                        <label htmlFor="nome_usuario" className="block text-sm font-medium text-gray-700">
                            Nome do Usuário
                        </label>
                        <input
                            type="text"
                            id="nome_usuario"
                            name="nome_usuario"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Usuário (APENAS O CRIADOR PODE EDITAR)"
                        />
                    </div>

                    {/* Botões */}



                    <div className="flex justify-between items-center mt-6">
                        <SheetClose asChild>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                                {tarefa.id ? 'Salvar' : 'Adicionar'}
                            </button>
                        </SheetClose>
                        {tarefa.id && (
                            <button
                                type="button"
                                onClick={() => setTarefa({ ...novaTarefa })}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
