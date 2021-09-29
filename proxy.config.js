//const targetDomain = process.env.NODE_ENV? `http://www.api-dev.s3manager.com.br` : 'http://localhost:8080';
const targetDomain = process.env.NODE_ENV? `http://54.160.45.246` : 'http://localhost:8080';
console.log(`Usando o endereço "${targetDomain}" para o proxy...\n`);


const PROXY_CONFIG = {
  "/api": {
    "target": targetDomain,
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": "true"
  },
};

module.exports = PROXY_CONFIG;
