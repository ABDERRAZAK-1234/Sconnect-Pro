const render = require("../core/renderer");

const getHome = async (req, res) => {
    await render(res, "pages/home/home", {
        title: "SportConnect Pro"
    });
};

module.exports = {
    getHome
};