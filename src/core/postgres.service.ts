import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

// await client.connect()
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()

@Injectable()
export class PostgresService {
  readonly pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eil_db_1',
    password: 'asdfasdf',
    port: 5432,
  });
}

// Docker
// {
//   user: process.env.POSTGRES_USER,
//   host: 'host.docker.internal',
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: 5433,
// }
