const basePath = __dirname + "/views/"; //getting root to provide absolute path

module.exports = app =>{
    app.get("/", (_, res) => res.sendFile(basePath + "index.html")); //serving index file
    app.get("/index", (_, res) => res.redirect("/")); //redirecting to index (/ and index pathes are the same)
}