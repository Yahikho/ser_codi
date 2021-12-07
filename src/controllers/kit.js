const { getConnection, sql } = require('../database/connection')
const { queries } = require('../database/querys')
const jwt = require('jsonwebtoken')

const authUser = async (req, res) => {
    const { userid = null, paswword = null } = req.body

    if (userid === null || paswword === null) {
        res.json('Petición mal realizada: campos indefinidos y/o faltan campos por definir')
    } else {
        const pool = await getConnection()
        const result = await pool
            .request()
            .input("userid", userid)
            .input("password", paswword)
            .query(queries.getUser)

        if (result.rowsAffected < 1) {
            res.json("Usuario o contraseña incorrectos")
        } else {
            const user = { userid: userid }

            const accessToken = generateAccessToken(user)

            res.json({
                msg: "Usuario autenticado",
                token: accessToken
            })
        }
    }
}

const updateKit = async (req, res) => {

    const { kitalistamiento = null, mesacertificada = null } = req.body
    let fechamesacertificada = new Date()

    if (kitalistamiento === null || mesacertificada === null) {
        return res.status(400).json({ msg: "Petición mal realizada: campos indefinidos y/o faltan campos por definir", response: "failed" })
    }

    if (kitalistamiento === "" || mesacertificada === "") {
        return res.status(400).json({ msg: "Petición mal realizada: varibles con valores vacíos", response: "failed" })
    }

    const kit = await getKit(kitalistamiento)

    if (!kit) {
        return res.status(400).json({ msg: "Petición mal realizada: kitalistamiento no existe", response: "failed" })
    }

    const pool = await getConnection()

    await pool
        .request()
        .input("kitalistamiento", sql.Int, kitalistamiento)
        .input("mesacertificada", sql.VarChar, mesacertificada)
        .input("fechamesacertificada", sql.DateTime, fechamesacertificada)
        .query(queries.updateKitByKitalistamiento)

    res.json([
        {
            msg: "Registro actualizado",
            response: "Succes"
        }
    ])
}

const getKit = async (kitalistamiento) => {
    let existKit = false

    const pool = await getConnection()
    const result = await pool
        .request()
        .input("kitalistamiento", kitalistamiento)
        .query(queries.getKit)

    if (result.rowsAffected > 0) existKit = true

    return existKit
}

const generateAccessToken = (user) => {
    return jwt.sign(user, 'secretkey', { expiresIn: "2m" })
}

function validateToken(req, res, next) {
    const accessToken = req.headers['authorization']
    if (!accessToken) res.json('Acceso denegado')

    jwt.verify(accessToken, 'secretkey', (err, user) => {
        if (err) {
            res.json('Acceso denegado, token expiro o es incorrecto ')
        } else {
            next()
        }
    })
}

module.exports = { updateKit, validateToken, authUser }