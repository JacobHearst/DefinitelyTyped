import Database, { RawDatabase } from '../model_structure/database';
declare namespace Parser {
    function parseJSONToDatabase(rawDatabase: RawDatabase): Database;
    function parseMySQLToJSON(str: string): RawDatabase;
    function parsePostgresToJSON(str: string): RawDatabase;
    function parseDBMLToJSON(str: string): RawDatabase;
    function parseSchemaRbToJSON(str: string): RawDatabase;
    function parseMSSQLToJSON(str: string): RawDatabase;
    function parse(str: string, format: 'mysql' | 'postgres' | 'dbml' | 'schemarb' | 'mssql' | 'json'): Database;
}
export default Parser;
