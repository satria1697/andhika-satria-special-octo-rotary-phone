module.exports = {
    env: {
        node: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        'plugin:vue/base',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-essential'
    ]
}
