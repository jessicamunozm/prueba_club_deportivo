import express from 'express';
import path from 'path';
import fs from "fs";

const routes = express.Router()
const __dirname = import.meta.dirname

// ruta raíz
routes.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

// ruta a data (para leer)
routes.get('/deportes', (req,res) => {
    res.sendFile(path.join(__dirname, "../assets/data/data.json"))
})

//ruta para crear 
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

//ruta para eliminar
routes.get('/eliminar', (req, res) => {
    const {nombre} = req.query
    const dataSports = fs.readFileSync("./assets/data/data.json")
    let {deportes} = JSON.parse(dataSports)
    const newSport = deportes.filter(item => item.nombre !== nombre)
    fs.writeFileSync("./assets/data/data.json", JSON.stringify({deportes: newSport}))
    res.send('eliminado con éxito')
    })

//ruta para editar
routes.get('/editar', (req, res) => {
    const { nombre, nuevoNombre, nuevoPrecio } = req.query;
    const dataSports = fs.readFileSync("./assets/data/data.json");
    let { deportes } = JSON.parse(dataSports);
    const deporteIndex = deportes.findIndex(deporte => deporte.nombre === nombre);
    // Actualizar el deporte
    deportes[deporteIndex].nombre = nuevoNombre;
    deportes[deporteIndex].precio = nuevoPrecio;

    fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }, null, 2));
    res.send('editado con éxito');
});

export default routes   
