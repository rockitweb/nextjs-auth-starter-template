import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import ws from 'ws';
neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool })

//const sql = neon(process.env.DATABASE_URL!);
//export const db = drizzle(sql);

////