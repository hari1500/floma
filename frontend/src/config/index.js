const baseUrl = "http://localhost:3500/v1";
const wsUrl = "http://localhost:3502";

const config = {
    wsUrl,

    loginUrl: `${baseUrl}/login`,
    registerUrl: `${baseUrl}/user`,
    getDocumentsUrl: `${baseUrl}/documents`,
    getDocumentUrl: `${baseUrl}/document`,
    createDocumentUrl: `${baseUrl}/document`,
    updateDocumentUrl: `${baseUrl}/document`,
    collaboratorsUrl: `${baseUrl}/collaborators`,
};

export default config;
