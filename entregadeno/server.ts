//serve me permite crear un servidor http

import { serve } from "https://deno.land/std@0.155.0/http/server.ts"; //Deno standard Library

const PORT = 8080;

//A este handler se enviaran todas las peticiones http
const handler = (req:Request): Response =>{
  return new Response('Primer servidor en Deno 🦖', {status: 200});
}

await serve(handler,{
  port: PORT
});

console.log(" Servidor corriendo en 🚀 http://localhost:" + PORT);


