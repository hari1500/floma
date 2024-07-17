const { handler: registerHandler } = require("../lib/handlers/register.js");
const { handler: loginHandler } = require("../lib/handlers/login.js");
const { handler: getDocumentsHandler } = require("../lib/handlers/getDocuments.js");
const { handler: getDocumentHandler } = require("../lib/handlers/getDocument.js");
const { handler: createDocumentHandler } = require("../lib/handlers/createDocument.js");
const { handler: updateDocumentHandler } = require("../lib/handlers/updateDocument.js");
const { handler: getCollaboratorsHandler } = require("../lib/handlers/getCollaborators.js");

const routes = [
    {
        "method": "POST",
        "path": "/v1/user",
        "handler": registerHandler,
    },
    {
        "method": "POST",
        "path": "/v1/login",
        "handler": loginHandler,
    },
    {
        "method": "GET",
        "path": "/v1/documents",
        "doAuth": true,
        "handler": getDocumentsHandler,
    },
    {
        "method": "GET",
        "path": "/v1/document",
        "doAuth": true,
        "handler": getDocumentHandler,
    },
    {
        "method": "POST",
        "path": "/v1/document",
        "doAuth": true,
        "handler": createDocumentHandler,
    },
    {
        "method": "PUT",
        "path": "/v1/document",
        "doAuth": true,
        "handler": updateDocumentHandler,
    },
    {
        "method": "GET",
        "path": "/v1/collaborators",
        "doAuth": true,
        "handler": getCollaboratorsHandler,
    },
];

module.exports = routes;
