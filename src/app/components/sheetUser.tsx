'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { saveUsuario } from "../services/usuario";
import { useState } from "react";

type UsuarioType = {
    id: number | null;
    nome: string;
    email: string;
};

type Props = {
    usuario: UsuarioType;
};

export default function SheetUsuarioComponent({ usuario: novoUsuario }: Props) {
    const [usuario, setUsuario] = useState<UsuarioType>(novoUsuario);

    return (
        <Sheet>
            <SheetTrigger>
                Criar Usuário
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Criar Usuário</SheetTitle>
                    <SheetDescription className="text-gray-600">
                        Cadastre um novo usuário para acessar o sistema.
                    </SheetDescription>
                </SheetHeader>

                <form action={saveUsuario} className="space-y-4 mt-6">
                    <input
                        type="hidden"
                        name="id"
                        value={`${usuario?.id}`}
                        className={`${usuario.id ? 'border-2 border-yellow-500' : 'border-2 border-blue-500'}`}
                    />

                    {/* Input para Nome */}
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Nome do Usuário"
                            value={usuario.nome}
                            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                        />
                    </div>

                    {/* Input para Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md text-black"
                            placeholder="Email do Usuário"
                            value={usuario.email}
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        />
                    </div>

                    {/* Botões */}
                    
                    <div className="flex justify-between items-center mt-6">
                    <SheetClose>
                           <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            {usuario.id ? 'Salvar' : 'Adicionar'}
                        </button>
                        {usuario.id && (
                            <button
                                type="button"
                                onClick={() => setUsuario({ ...novoUsuario })}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </SheetClose>
                     
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
