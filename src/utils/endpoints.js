// This is basically my .env file, didnt really need to add the whole module tbh
// and i dont have any more .env variables.

var ServerEndpoint
let env = process.env.REACT_APP_DEP_ENV
console.log("env", env)
if (env === "test") {
  ServerEndpoint = "https://api.nikanostovan.dev/test"
} else if (env === "local") {
  ServerEndpoint = "http://localhost:8080"
} else if (env === "prod") {
  ServerEndpoint = "https://api.nikanostovan.dev"
}
export { ServerEndpoint as ServerEndpoint }
