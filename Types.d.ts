import { Connection } from "mongoose";

// connection, no connection, Promise on the way
declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null 
    }
}

export {}