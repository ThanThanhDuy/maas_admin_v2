const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            "primary-color": "#31b057",
            "link-color": "#31b057",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
