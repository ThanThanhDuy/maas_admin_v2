const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#51c273",
            "link-color": "#51c273",
            "btn-danger-bg": "#ed646a",
            "btn-danger-border": "#ed646a",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
