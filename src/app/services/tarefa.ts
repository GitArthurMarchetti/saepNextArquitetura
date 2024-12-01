"use server";


import { sql } from "drizzle-orm";
import db from "./db";
import { redirect } from 'next/navigation'



type TarefaType = {
    id: number | null;
    titulo: string;
    descricao: string;
    status: "aFazer" | "processando" | "concluido";
    prioridade: "BAIXA" | "MEDIA" | "ALTA";
    id_usuario: number | string | null; // Permite null
    criado_em?: string;
    atualizado_em?: string;
};

export default TarefaType





export async function getEmptyTarefa(): Promise<TarefaType> {
    return {
        id: null,
        titulo: "",
        descricao: "",
        status: "aFazer", // Status padrão
        prioridade: "MEDIA", // Prioridade padrão
        id_usuario: 0, // Valor padrão para inicialização
    };
}


export async function getTarefas(): Promise<TarefaType[]> {
    const results = await db.execute(
        sql`
        SELECT 
            id, 
            titulo, 
            descricao, 
            status, 
            prioridade, 
            id_usuario, 
            criado_em, 
            atualizado_em 
        FROM tarefas
        ORDER BY 
            CASE prioridade 
                WHEN 'ALTA' THEN 1
                WHEN 'MEDIA' THEN 2
                WHEN 'BAIXA' THEN 3
            END ASC,
            id ASC;
    `
    );

    console.log("Resultados brutos do banco:", results);

    return results.map((row: any) => ({
        id: row.id,
        titulo: row.titulo,
        descricao: row.descricao,
        status: row.status,
        prioridade: row.prioridade, 
        id_usuario: row.id_usuario,
        criado_em: row.criado_em,
        atualizado_em: row.atualizado_em,
    })) as TarefaType[];
}




export async function getTarefasByUsuario(id_usuario: number): Promise<TarefaType[]> {
    const results = await db.execute(
        sql`SELECT * FROM tarefas WHERE id_usuario = ${id_usuario} ORDER BY id`
    );
    return results.map((row: any) => ({
        id: row.id,
        titulo: row.titulo,
        descricao: row.descricao,
        status: row.status,
        prioridade: row.prioridade,
        id_usuario: row.id_usuario,
        criado_em: row.criado_em,
        atualizado_em: row.atualizado_em,
    })) as TarefaType[];
}

export async function saveTarefa(formData: FormData) {
    const id = formData.get('id') ? +(formData.get('id') as string) : null;
    const titulo = formData.get('titulo') as string;
    const descricao = formData.get('descricao') as string;
    const status = (formData.get('status') as string) || 'aFazer'; // Valor padrão
    const prioridade = formData.get('prioridade') as "BAIXA" | "MEDIA" | "ALTA";
    const nome_usuario = formData.get('nome_usuario') as string; // Nome do usuário enviado pelo formulário



    // Validação inicial
    if (!titulo || !descricao || !prioridade || !nome_usuario ) {
        throw new Error("Todos os campos obrigatórios, incluindo o nome do usuário, devem ser preenchidos.");
    }

    // Buscar o id_usuario baseado no nome do usuário
    const usuario = await db.execute(sql`
        SELECT id FROM usuarios WHERE nome = ${nome_usuario} LIMIT 1
    `);

    // Mapear o resultado para o tipo esperado
    const id_usuario = usuario[0]?.id as number | undefined;

    if (!id_usuario) {
        throw new Error(`Usuário com o nome "${nome_usuario}" não foi encontrado.`);
    }

    // Criar o objeto tarefa
    const tarefa: Omit<TarefaType, 'criado_em' | 'atualizado_em'> = {
        id,
        titulo,
        descricao,
        status: status as "aFazer" | "processando" | "concluido",
        prioridade,
        id_usuario,
    };

    // Inserir ou atualizar a tarefa
    if (!id) {
        await db.execute(sql`
            INSERT INTO tarefas (titulo, descricao, status, prioridade, id_usuario)
            VALUES (${tarefa.titulo}, ${tarefa.descricao}, ${tarefa.status}, ${tarefa.prioridade}, ${tarefa.id_usuario})
        `);
    } else {
        await db.execute(sql`
            UPDATE tarefas
            SET titulo = ${tarefa.titulo},
                descricao = ${tarefa.descricao},
                status = ${tarefa.status},
                prioridade = ${tarefa.prioridade},
                atualizado_em = CURRENT_TIMESTAMP
            WHERE id = ${tarefa.id}
        `);
    }

    redirect('/');
}




export async function removeTarefa(tarefa: TarefaType) {

    await db.execute(sql`DELETE FROM tarefas WHERE id=${tarefa.id}`)

    redirect('/')
}