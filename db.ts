import * as schema from '@/schema';
import { drizzle } from 'drizzle-orm/neon-serverless';
if (!process.env.DATABASE_URL){
  throw new Error('Missing DATABASE_URL')
}
const db = drizzle(process.env.DATABASE_URL, {schema})
export default db