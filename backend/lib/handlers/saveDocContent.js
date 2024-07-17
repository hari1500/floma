const DocContent = require("../db/models/DocContent.js");

// TODO: remove connId from cache
const handler = async ({ connId }, allContents, ws) => {
    // console.log(allContents);
    for (const key in allContents) {
        if (allContents[key]["EDIT"].includes(connId)) {
            console.log("saving doc", key);
            try {
                await DocContent.findOneAndUpdate({ docId: key }, {
                    docId: key,
                    content: allContents[key]["data"],
                });
            } catch (error) {
                console.error(error);
            }
            return;
        }
    }
};

module.exports = { handler };
