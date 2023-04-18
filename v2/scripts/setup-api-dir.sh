func --version > function_version.log
func init api --worker-runtime node --language typescript --enable-json-output > function_new_api.log 
cd api
npm install
npm ls > ../function_npm_versions.log
func new --name add --template  "HTTP trigger" > ../function_new_api_add.log