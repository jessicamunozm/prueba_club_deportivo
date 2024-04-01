import express from 'express';
import path from 'path';
import fs from "fs";
const routes = express.Router()
const __dirname = import.meta.dirname

// ruta raíz
routes.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

// ruta a data 
routes.get('/deportes', (req,res) => {
    res.sendFile(path.join(__dirname, "../assets/data/data.json"))
})

// nombre y precio se recogen de "name" del input del index.html
routes.get('/agregar', (req,res) => {
    const {nombre, precio} = req.query
// primero se trae la data del archivo data.json y luego se agrega el contenido del formulario
    const dataSports = fs.readFileSync("./assets/data/data.json")
    const {deportes} = JSON.parse(dataSports)
    deportes.push({nombre, precio})
    fs.writeFileSync("./assets/data/data.json", JSON.stringify({deportes}))
    res.send ('agregado con éxito')
})

export default routes