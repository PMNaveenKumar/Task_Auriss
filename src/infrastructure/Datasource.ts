import * as mysql from 'mysql';
import { injectable } from "inversify";

@injectable()
export class Datasource {
    private dbconnection: mysql.Pool;

    async connect(): Promise<boolean> {
        this.dbconnection = await mysql.createPool({
            host     : process.env.HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        });

        this.dbconnection.on('connection', function (connection) {
            console.log('DB Connection established');

            connection.on('error', function (err) {
                console.error(new Date(), 'MySQL error', err.code);
            });

            connection.on('close', function (err) {
                console.error(new Date(), 'MySQL close', err);
            });
        });

        return true;
    }

    async executeQuery(query : string, values?: any[]) : Promise<any> {
        try {  
            return new Promise((resolve, reject) => {
                this.dbconnection.query(query, values, (err, result) => {
                    if(err) {
                        return reject(err);
                    };
                    
                    resolve(result);
                });  
            });

        } catch (err) {
            throw(err);
        }
    }
}