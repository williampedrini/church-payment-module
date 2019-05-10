module.exports = function (env) {
    return require("./config/webpack." + Object.keys(env)[0] + ".js")(env);
};