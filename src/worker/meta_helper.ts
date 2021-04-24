import { IDBUtil } from "./idb_util";
import { promise } from "@/common";

export class MetaHelper {
    static tableName = "JsStore_Meta";
    static autoIncrementKey(tableName: string, columnName: string) {
        return `JsStore_${tableName}_${columnName}_Value`;
    }
    static dbSchema() {
        return `JsStore_DbSchema`;
    }

    static set(key, value, util: IDBUtil) {
        if (!util.transaction) {
            util.createTransaction([MetaHelper.tableName]);
        }
        const store = util.objectStore(MetaHelper.tableName);

        return promise((res, rej) => {
            const req = store.put({
                key, value
            });
            req.onsuccess = res;
            req.onerror = rej;
        });
    }
}