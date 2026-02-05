module.exports = {
    apps: [
        {
            name: "ansari-matrimonials",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3000
            }
        }
    ]
};
