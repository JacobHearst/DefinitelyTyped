import Database, { NormalizedDatabase } from '../model_structure/database';
// tslint:disable-next-line
declare class ModelExporter {
    static export(model: Database | NormalizedDatabase, format: 'dbml' | 'mysql' | 'postgres' | 'json' | 'mssql', isNormalized?: boolean): string;
}
export default ModelExporter;
