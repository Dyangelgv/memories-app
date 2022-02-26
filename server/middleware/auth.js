import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //todo: obtenemos el token enviado por el header
        //console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        //todo: Si el token es Menos a 500, es un token de google
        const isCurrentAuth = token.length < 500;
        let decodeData;

        if(token && isCurrentAuth){
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData?.id;
        }else{
            decodeData = jwt.decode(token);
            //todo: sub es lo verificación que utilizaremos por medio de googleApi
            req.userId = decodeData?.sub;
        }

        next(); 

    } catch (err) {
        console.log(err.message);
    }
}

export default auth;