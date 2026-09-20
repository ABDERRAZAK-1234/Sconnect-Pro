const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            if (!body) {
                return resolve({});
            }

            try {
                const data = JSON.parse(body);
                resolve(data);
            } catch (error) {
                reject(new Error("JSON invalide"));
            }
        });

        req.on("error", (error) => {
            reject(error);
        });
    });
};

module.exports = parseBody;