import { promise } from "@/common";
import { updateValue } from "./update_value";
import { Update } from ".";

export const executeWhereLogic = function (this: Update, column, value, op) {
    let cursor: IDBCursorWithValue,
        cursorRequest;
    value = op ? value[op] : value;
    cursorRequest = this.objectStore.index(column).openCursor(this.util.keyRange(value, op));
    const setValue = (this.query as any).set;
    return promise<void>((res, rej) => {
        cursorRequest.onsuccess = (e) => {
            cursor = e.target.result;
            if (cursor) {
                if (this.whereCheckerInstance.check(cursor.value)) {
                    const cursorUpdateRequest = cursor.update(updateValue(setValue, cursor.value));
                    cursorUpdateRequest.onsuccess = () => {
                        ++this.rowAffected;
                        cursor.continue();
                    };
                    cursorUpdateRequest.onerror = rej;
                }
                else {
                    cursor.continue();
                }
            }
            else {
                res();
            }
        };
        cursorRequest.onerror = rej
    })
}