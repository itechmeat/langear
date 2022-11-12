export const SELECT = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"id":{"_ceq":["$","project_id"]}}}}`
// all columns

export const INSERT = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}`
// name, project_id, language, format

export const UPDATE = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}`
// name, language, format

export const DELETE = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}`
