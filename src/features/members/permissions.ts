export const SELECT = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"id":{"_ceq":["$","project_id"]}}}}`
// all columns

export const INSERT = `{"_and":[{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}]}`
// user_id, role, project_id

export const UPDATE = `{"_and":[{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}]}`
// role

export const DELETE = `{"_exists":{"_table":{"name":"projects","schema":"public"},"_where":{"_and":[{"id":{"_ceq":["$","project_id"]}},{"owner_id":{"_eq":"X-Hasura-User-Id"}}]}}}`
