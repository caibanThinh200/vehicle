const app = require("./app");
const server = require("http").createServer(app)
const PORT =process.env.PORT ;

server.listen(PORT,(err)=>{
    err?console.log(err):console.log('server running on port '+PORT);
})