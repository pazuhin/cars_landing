module.exports = {
    syntax: "postcss-scss",
    plugins: [
        require("postcss-easy-import")({
            extensions: ".scss"
        }),
        require("autoprefixer")({
            browsers: ["last 2 versions"],
            cascade: false
        }),
        require("postcss-nested"),
        require("postcss-rgb"),
        require("postcss-inline-svg")({
            removeFill: true,
            path: "./src/assets/images/icons"
        }),
        require("postcss-svgo"),
        require("cssnano")()
    ]
};