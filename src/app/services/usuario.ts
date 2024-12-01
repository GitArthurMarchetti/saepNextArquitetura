"use server";

import { sql } from "drizzle-orm";
import db from "./db";
import { redirect } from "next/navigation";

// Tipo para o usuário
export type UsuarioType = {
    id: number | null;
    nome: string;
    email: string;
    criado_em?: string; // Opcional, pois será gerado automaticamente pelo banco
};

// Função para retornar um modelo vazio de usuário
export async function getEmptyUsuario(): Promise<UsuarioType> {
    return {
        id: null,
        nome: "",
        email: "",
    };
}


export async function saveUsuario(formData: FormData) {
    const id = formData.get('id') ? +(formData.get('id') as string) : null;
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;

    // Validação inicial
    if (!nome || !email) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // Criação ou atualização do usuário
    if (!id) {
        // Inserção de novo usuário
        await db.execute(sql`
            INSERT INTO usuarios (nome, email)
            VALUES (${nome}, ${email})
        `);
    } else {
        // Atualização de usuário existente
        await db.execute(sql`
            UPDATE usuarios
            SET nome = ${nome}, email = ${email}
            WHERE id = ${id}
        `);
    }

    // Redirecionar para a página inicial ou outro local apropriado
    redirect('/');
}


// Função para excluir um usuário pelo ID
export async function deleteUsuario(id: number): Promise<void> {
    if (!id) {
        throw new Error("O ID do usuário é obrigatório para exclusões.");
    }

    await db.execute(sql`
        DELETE FROM usuarios WHERE id = ${id}
    `);
    redirect('/');
}

// Função para obter um usuário pelo ID
export async function getUsuarioById(id: number): Promise<UsuarioType | null> {
    if (!id) {
        throw new Error("O ID do usuário é obrigatório para busca.");
    }

    const result = await db.execute(sql`
        SELECT id, nome, email, criado_em
        FROM usuarios
        WHERE id = ${id}
        LIMIT 1
    `);

    const usuario = result[0] as UsuarioType | undefined;

    return usuario || null;
}

export async function getUsuarios(): Promise<UsuarioType[]> {
    return await db.execute(sql`SELECT * FROM usuarios ORDER BY id`) as UsuarioType[];
}
