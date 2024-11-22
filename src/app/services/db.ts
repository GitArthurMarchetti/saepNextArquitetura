// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";


// const connectionString = process.env.DATABASE_URL as string
// const client = postgres(connectionString, {prepare: false})

// const db = drizzle(client)

// export default db;



 import { drizzle } from "drizzle-orm/postgres-js";
 import postgres from "postgres";

 const connectionString = process.env.DATABASE_URL as string;

//   Cria o cliente PostgreSQL usando a string de conexão
 const client = postgres(connectionString, {
     prepare: false, // Desativa o prepare statements
     ssl: process.env.NODE_ENV === "production",  //Ativa SSL em produção
 });

  //Configura o Drizzle ORM com o cliente PostgreSQL
 const db = drizzle(client);

 export default db;