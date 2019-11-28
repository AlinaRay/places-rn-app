import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places 
                (id INTEGER PRIMARY KEY NOT NULL, 
                title TEXT NOT NULL, 
                imageUri TEXT NOT NULL, 
                address TEXT NOT NULL, 
                lat REAL NOT NULL, 
                lng REAL NOT NULL);`,
                [],
                () => { //if succeed
                    resolve();
                },
                (_, err) => { //if failed
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places 
                (title, imageUri, address, lat, lng) 
                VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, address, lat, lng], //passing data to VALUES,
                (_, result) => { //if succeed
                    resolve(result);
                },
                (_, err) => { //if failed
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM places', // selection of all fields
                [], // there will eject no args
                (_, result) => { //if succeed
                    resolve(result);
                },
                (_, err) => { //if failed
                    reject(err);
                },
            );
        });
    });
    return promise;
};
