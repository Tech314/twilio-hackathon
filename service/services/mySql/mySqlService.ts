
import { getEnvVariable } from '../../env';
import { Pool, createPool, PoolConfig, format } from 'mysql';

class MySqlService {

    private pool: Pool;
     
    public activate = () => {
        const sessionOpts: PoolConfig = {
            host: getEnvVariable('HACKATHON_DBHOST'),
            user: getEnvVariable('HACKATHON_DBUSER'),
            password: getEnvVariable('HACKATHON_DBPASS'),
            database: getEnvVariable('HACKATHON_DB'),
            dateStrings: true,
            supportBigNumbers: true
        };
        this.pool = createPool(sessionOpts);
    };

    public createRoom = (roomId: string) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'INSERT INTO CHAT_ROOMS (room_id, rep_joined, date_created) VALUES (?, ?, ?)';

            const query = format(queryString, [roomId, 'false', new Date()]);

            this.pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public joinRoom = (roomId: string) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'UPDATE CHAT_ROOMS SET rep_joined = ? WHERE room_id = ?';

            const query = format(queryString, ['true', roomId]);
            console.log(query);
            this.pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public removeRoom = (roomId: string) => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'DELETE FROM CHAT_ROOMS WHERE room_id = ?';

            const query = format(queryString, [roomId]);
            console.log(query);

            this.pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public selectAllRooms = () => {
        return new Promise<any>((resolve, reject) => {
            const query = 'SELECT * FROM CHAT_ROOMS ORDER BY date_created DESC';

            this.pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };

    public selectAllUnjoinedRooms = () => {
        return new Promise<any>((resolve, reject) => {
            const queryString = 'SELECT * FROM CHAT_ROOMS WHERE rep_joined = ? ORDER BY date_created DESC';
            
            const query = format(queryString, ['false']);

            this.pool.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };
}

export const mySqlService: MySqlService = new MySqlService();