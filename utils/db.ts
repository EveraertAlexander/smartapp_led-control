import { openDatabase, Database, SQLTransaction, Query, SQLResultSet, SQLError } from 'expo-sqlite';
import { LedConfig } from '../models/ledConfig';
import { Color, ColorPalette } from '../models/palette';
import { Param } from '../models/param';

const databaseName: string = 'ledControl',
    tableName: string = 'ledConfig';

const getDb = function (name: string = databaseName): Database {
    //opent db als ze bestaat, maakt aan als ze nog niet bestaat
    return openDatabase(name);
}

const transaction = function (db: Database): Promise<SQLTransaction> {

    return new Promise(function (resolve, reject) {
        db.transaction(
            (tx: SQLTransaction) => {
                resolve(tx);
            },
            (error) => {
                reject(error)
                console.info(error)
            },
            () => {
                console.info('Transaction succeded 🥳')
            }
        )
    })
}

const query = (tx: SQLTransaction, query: Query): Promise<SQLResultSet> => {
    return new Promise(function (resolve, reject) {
        tx.executeSql(
            query.sql,
            query.args,
            (tx: SQLTransaction, res: SQLResultSet) => {
                resolve(res)

            },
            (tx: SQLTransaction, error: SQLError): boolean => {
                reject(error)
                return true;
            }
        )
    })
}

export const initLedConfig = async () => {
    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));
    // console.log({ tx });

    if (tx) {
        const res = await query(tx, {
            sql: "CREATE TABLE IF NOT EXISTS 'ledConfig' (id integer primary key autoincrement, name text, ipAddress text)",
            args: []
        });

        // console.log(res)
    }
}

export const initLastSettings = async () => {
    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));
    // console.log({ tx });

    if (tx) {
        const res = await query(tx, {
            sql: "CREATE TABLE IF NOT EXISTS 'lastSettings' (id string primary key, value real)",
            args: []
        });

        // console.log(res)
    }
}

export const initPalettes = async () => {

    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));

    if (tx) {
        const res = await query(tx, {
            sql: `CREATE TABLE IF NOT EXISTS palettes (
                id                   integer NOT NULL  PRIMARY KEY  ,
                name                 varchar(100)
             );`,
            // sql: "DROP TABLE palettes",
            args: []
        })



    }
}

export const initColors = async () => {
    const db = getDb();
    const tx = await transaction(db).catch(error => console.error(error));

    if (tx) {
        const res = await query(tx, {
            sql: `CREATE TABLE IF NOT EXISTS color (
                h                    double(10,20) NOT NULL    ,
                s                    double(10,20) NOT NULL    ,
                v                    double(10,20) NOT NULL    ,
                paletteId            integer     ,
                colorId                   integer NOT NULL  PRIMARY KEY autoincrement  ,
                FOREIGN KEY ( paletteId ) REFERENCES palette( id )
             );`,
            // sql: "DROP TABLE color",
            args: []
        })

    }
}

export const palettes = {
    read: {
        allPalettes: (): Promise<ColorPalette[]> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT palettes.id, palettes.name, color.h, color.s, color.v, color.colorId FROM 'palettes' LEFT JOIN color ON palettes.id = color.paletteId ",
                    // sql: "SELECT * FROM `color`",
                    args: [],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {

                    let palettes: ColorPalette[] = [];

                    (res.rows as any)._array.map((obj: any) => {
                        let found = false;
                        palettes.map((p) => {
                            if (p.id == obj.id) {
                                found = true
                                p.colors.push({ h: obj.h, s: obj.s, v: obj.v, colorId: obj.colorId })
                            }
                        })
                        
                        if (!found) {
                            palettes.push({ id: obj.id, name: obj.name, colors: (obj.colorId ? [{ h: obj.h, s: obj.s, v: obj.v, colorId: obj.colorId }] : []) })
                        }
                    })

                    resolve(palettes)
                }
            })
        },
    },

    create: {
        palette: async (p: ColorPalette): Promise<SQLResultSet> => {

            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "INSERT INTO `palettes` (id, name) values(?, ?)",
                    args: [p.id, p.name],
                }).catch((error) => {
                    reject(error);
                });

                p.colors.map(async (c) => {
                    const db = getDb();
                    const temptx = await transaction(db);
                    const res2 = await query(temptx, {
                        sql: "INSERT INTO `color` (h, s, v, paletteId, colorId) VALUES(?, ?, ?, ?, ?)",
                        args: [c.h, c.v, c.v, p.id, null]
                    }).catch((error) => {
                        reject(error);
                    })
                })


                if (res) {
                    resolve(res)
                }
            })

        },
    },

    delete: (id: Number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb();

            let tx = await transaction(db);

            await query(tx, {
                sql: "DELETE FROM `color` WHERE paletteId = ?",
                args: [id]
            }).catch((error) => {
                reject(error);
            })

            tx = await transaction(db);

            const res = await query(tx, {
                sql: "DELETE FROM `palettes` WHERE id = ?",
                args: [id]
            }).catch((error) => {
                reject(error);
            })

            if (res) {
                resolve(res)
            }
        })
    },
    update: (p: ColorPalette): Promise<SQLResultSet> => {
        return new Promise(async (resolve, reject) => {
            const db = getDb()
            let tx = await transaction(db);


            await query(tx, {
                sql: "UPDATE `palettes` SET name = ? WHERE id = ?",
                args: [p.name, p.id]
            }).catch((error) => {
                reject(error);
            });

            tx = await transaction(db);

            const res = await query(tx, {
                sql: "DELETE FROM `color` WHERE paletteId = ?",
                args: [p.id]
            }).catch((error) => {
                reject(error);
            });

            if (res) {

                p.colors.map(async (c) => {
                    const db = getDb();
                    const temptx = await transaction(db);
                    const res2 = await query(temptx, {
                        sql: "INSERT INTO `color` (h, s, v, paletteId, colorId) VALUES(?, ?, ?, ?, ?)",
                        args: [c.h, c.s, c.v, p.id, null]
                    }).catch((error) => {
                        reject(error);
                    })
                })
            }


            if (res) {
                resolve(res);
            }
        })
    }


}

export const lastSettings = {
    upsert: async (p: Param): Promise<SQLResultSet> => {

        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "INSERT INTO `lastSettings` (id, value) values(?, ?) ON CONFLICT(id) DO UPDATE SET value = (?)",
                args: [p.key, p.currentValue, p.currentValue],
            }).catch((error) => {
                reject(error);
            });

            if (res) {
                resolve(res)
            }
        })

    },

    read: {
        all: (): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'lastSettings'",
                    args: [],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
        detail: (id: Number): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'ledConfig' WHERE id = ?",
                    args: [id],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
    },
}

export const ledConfig = {
    create: async (c: LedConfig): Promise<SQLResultSet> => {

        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "INSERT INTO `ledConfig` (id, name, ipAddress) values(?, ?, ?)",
                args: [null, c.name, c.ipAddress],
            }).catch((error) => {
                reject(error);
            });

            if (res) {
                resolve(res)
            }
        })

    },

    read: {
        all: (): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'ledConfig'",
                    args: [],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
        detail: (id: Number): Promise<SQLResultSet> => {
            return new Promise(async function (resolve, reject) {
                const db = getDb();
                const tx = await transaction(db);

                const res = await query(tx, {
                    sql: "SELECT * FROM 'ledConfig' WHERE id = ?",
                    args: [id],
                }).catch((error) => {
                    reject(error);
                });

                if (res) {
                    resolve(res)
                }
            })
        },
    },

    update: (c: LedConfig): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb(),
                tx = await transaction(db);

            const res = await query(tx, {
                sql: "UPDATE `ledConfig` SET name = ? , ipAddress = ? WHERE id = ?",
                args: [c.name, c.ipAddress, c.id],
            }).catch((error) => {
                reject(error);
            });

            if (res) resolve(res);
        });
    },

    delete: (id: Number): Promise<SQLResultSet> => {
        return new Promise(async function (resolve, reject) {
            const db = getDb();
            const tx = await transaction(db);

            const res = await query(tx, {
                sql: "DELETE FROM 'ledConfig' WHERE id= ?",
                args: [id],
            }).catch((error) => {
                reject(error);
            });

            if (res) {
                resolve(res)
            }
        })
    }
}

