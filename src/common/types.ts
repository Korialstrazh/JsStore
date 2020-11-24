import { IError } from "./interfaces";
import { API, EVENT } from "./enums";

export type OrderQuery = {

    /**
     * sorting column name
     *
     * @type {(string | { [columnName: string]: [CaseOption] })}
     */
    by: string | { [columnName: string]: [CaseOption] };

    /**
     * sorting type - asc/desc
     *
     * @type {string}
     */
    type: string;

    /**
     * whether to do sorting by indexeddb or by jsstore
     * default - true
     * @type {boolean}
     */
    idbSorting?: boolean;

    /**
     * use this option to modify ordering
     *
     * @type {[CaseOption]}
     */
    case?: [CaseOption]
};

export type JoinQuery = {
    type?: string //'inner',
    with: string // 'Customers',
    on: string // "Customers.customerId = Orders.customerId"
    where?: { [columnName: string]: any };
    order?: OrderQuery;
    as?: { [originalColumnName: string]: string },
    case?: { [columnName: string]: [CaseOption] },
    flatten?: string[];
};

export type SelectQuery = {
    from: string;
    join?: JoinQuery | JoinQuery[];
    where?: { [columnName: string]: any };
    skip?: number;
    limit?: number;
    order?: OrderQuery;
    groupBy?: string | string[] | { [columnName: string]: [CaseOption] };
    aggregate?: AggregateOption;
    distinct?: boolean;
    case?: { [columnName: string]: [CaseOption] },
    flatten?: string[];
};

export type CaseOption = {
    '>'?: any;
    '<'?: any;
    '>='?: any;
    '<='?: any;
    '-'?: any;
    '!='?: any;
    then: any;
};

export type AggregateOption = {
    max?: string | string[];
    min?: string | string[];
    sum?: string | string[];
    count?: string | string[];
    avg?: string | string[];
};

export type WebWorkerRequest = {
    name: API;
    query?: any;
    onSuccess?: (results) => void;
    onError?: (err: IError) => void;
};

export type DbInfo = {
    dbName: string;
    table: {
        name: string,
        version: number
    };
};

export type CountQuery = {
    from: string;
    join?: JoinQuery;
    where?: { [columnName: string]: any };
};

export type RemoveQuery = {
    from: string;
    where?: { [columnName: string]: any };
};

export type UpdateQuery = {
    in: string;
    ignoreCase?: boolean;
    set: { [columnName: string]: any };
    where?: { [columnName: string]: any };
};

export type InsertQuery = {
    into: string;
    values: any[];
    return?: boolean;
    skipDataCheck?: boolean;
    upsert?: boolean;
};

export type WebWorkerResult = {
    errorOccured: boolean;
    errorDetails: any;
    returnedValue: any;
    throwError: boolean;
};

export type TranscationQuery = {
    tables: string[];
    logic: (data: any) => Promise<void>;
    data: any;
};

export type SqlWebResult = {
    api: string;
    data: any;
};

export type EventQueue = {
    event: EVENT;
    callback: Function
};

export type SetQuery = {
    key: string;
    value: any;
};

export type IntersectQuery = {
    queries: SelectQuery[];
    skip: number;
    limit: number;
    order?: OrderQuery;
};