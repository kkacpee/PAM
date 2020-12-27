import { connectionName } from "../data/Database";
import { Connection, getConnection } from "typeorm/browser";

export default abstract class BaseController {

    connection : Connection;

    constructor() {   
        this.connection = getConnection(connectionName);

        if (this.connection == null || this.connection == undefined){
            
            throw new Error("Invalid app state. No connection defined.");
        }
    }
}