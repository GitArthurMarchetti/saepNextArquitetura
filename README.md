.env.local :

DATABASE_URL=postgresql://postgres.wwzsssxjpvrvxgkhlmqt:SeEuTirarMenosQueAOTouroVaiCantar@aws-0-sa-east-1.pooler.supabase.com:6543/postgres



-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de tarefas
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('aFazer', 'processando', 'concluido')) DEFAULT 'aFazer',
    prioridade VARCHAR(10) CHECK (prioridade IN ('BAIXA', 'MEDIA', 'ALTA')) NOT NULL,
    nomeSetor Varchar(100) NOT NULL,
    id_usuario INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);


Voltar commit: 
git reset --hard HEAD
