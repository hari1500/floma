const handler = async ({ data, connId }, allContents, ws) => {
    const { content } = data;
    if (!content) {
        const error = "content is not found";
        console.error(error);
        ws.send(JSON.stringify({ error }));
        return;
    }

    for (const key in allContents) {
        if (allContents[key]["VIEW"].includes(connId)) {
            const error = `unauthorized to update ${key}`;
            console.error(error);
            ws.send(JSON.stringify({ error }));
            return;
        }
        if (allContents[key]["EDIT"].includes(connId)) {
            allContents[key]["data"] = content;
            allContents[key]["ws"].forEach((w) => {
                if (w !== ws) {
                    w.send(JSON.stringify({ "data": allContents[key]["data"] }));
                }
            });
            return;
        }
    }

    ws.send(JSON.stringify({ error: "Internal Server Error" }));
};

module.exports = { handler };
