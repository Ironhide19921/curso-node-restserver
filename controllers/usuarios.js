const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre = 'No name', apikey, page, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip(Number( desde ))
        .limit(Number( limite ));

    res.json({
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol });

    // Encriptar la pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, corre, ...resto } = req.body;

    if ( password ) {
        // Encriptar la pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );



    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'Patch API - controlador'
    });
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'Delete API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}