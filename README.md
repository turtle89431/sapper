# sapper
## *[sapper](https://sapper.svelte.dev/)* fork that i made to work with *[express](https://sapper.svelte.dev/)* routes as I prefer express over *[polka](https://github.com/lukeed/polka)*

- express rout example in src/sroutes and refranced in server.js

    const sroutes = require("./sroutes/api") // <-- express server routes
    app.use("/api", sroutes)
