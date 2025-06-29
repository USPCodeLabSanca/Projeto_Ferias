/**
 * An enum of query types used by {@link Sequelize#query}.
 */
export declare enum QueryTypes {
    SELECT = "SELECT",
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    BULKUPDATE = "BULKUPDATE",
    DELETE = "DELETE",
    UPSERT = "UPSERT",
    SHOWINDEXES = "SHOWINDEXES",
    DESCRIBE = "DESCRIBE",
    RAW = "RAW",
    SHOWCONSTRAINTS = "SHOWCONSTRAINTS"
}
