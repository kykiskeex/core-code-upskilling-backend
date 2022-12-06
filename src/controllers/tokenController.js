const secret =require("../auth/jwt/secret.js");
const verifyJWT =require("../auth/jwt/verifyJWT.js");
const jwt      = require('jsonwebtoken');

const UsersDao = require('../dao/usersDao');

const usersDao = new UsersDao();

exports.getToken = async (req, res)=>{
    var username=req.body.username;  
    var password=req.body.password;
    if((username===undefined || username==="") || (password===undefined || password==="")){
        return res.status(412).send({ auth: false, message: 'Credenciales incorrectas'});
    }

    try {

        const result = await usersDao.getUsersByIdAndPass({username, password});

        if(result.length > 0){
            let objUsuario = result[0];
            let rol = objUsuario.rol;
            UserToken ={userName: objUsuario.usuario, type:'Token'};
            UserRefreshToken ={userName: objUsuario.usuario, type:'Refresh Token'};
            const token = jwt.sign(UserToken, secret.keyToken,{expiresIn: secret.tokenExpired});
            var refreshToken = jwt.sign(UserRefreshToken, secret.keyRefreshToken, { expiresIn: secret.refreshTokenExpired })
            verifyJWT.refreshTokens[refreshToken] = UserRefreshToken.userName;
            return res.json({token, refreshToken, rol, username});
        }else{
            return res.status(401).send({auth: false, message: 'Credenciales incorrectas'});
        }

    }catch (e) {
        console.log(`getUser Error: ${e.message}`);
        res.status(412).send({ auth: false, message: 'Credenciales incorrectas'});

    }
};

exports.getTokenAndRegister = async (req, res)=>{
    var username=req.body.username;  
    var password=req.body.password;
    var email=req.body.email;
    var name=req.body.name;
    var rol=req.body.rol;
    if((username===undefined || username==="") || (password===undefined || password==="") || (rol===undefined || rol==="")){
        return res.status(412).send({ auth: false, message: 'Incorrect Credentials'});
    }

    try {

        const result = await usersDao.getUsersByIdAndPass({username, password});

        if(result.length > 0){
            return res.status(401).send({auth: false, message: 'User already exists'});
        }else{

            const result = await usersDao.addUsers({username, password, email, name, rol});

            UserToken ={userName: username, type:'Token'};
            UserRefreshToken ={userName: username, type:'Refresh Token'};
            const token = jwt.sign(UserToken, secret.keyToken,{expiresIn: secret.tokenExpired});
            var refreshToken = jwt.sign(UserRefreshToken, secret.keyRefreshToken, { expiresIn: secret.refreshTokenExpired })
            verifyJWT.refreshTokens[refreshToken] = UserRefreshToken.userName;
            return res.json({token, refreshToken, rol, username});
        }

    }catch (e) {
        console.log(`getUser Error: ${e.message}`);
        res.status(412).send({ auth: false, message: 'Incorrect Credentials'});

    }
};