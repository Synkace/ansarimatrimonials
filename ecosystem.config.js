module.exports = {
    apps: [
        {
            name: "ansari-matrimonials",
            script: "./node_modules/next/dist/bin/next",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000
            }
        }
    ]
};
