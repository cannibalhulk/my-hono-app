import app from "./app.ts";
console.log("Server is running");


Deno.serve(app.fetch)