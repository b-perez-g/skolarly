const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const authCtrl = {}


authCtrl.generateToken = async (req, res) => {

    const { ID, RUT, TIPO } = req.body;

    const token = jwt.sign({
        ID,
        RUT,
        TIPO,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000 //30 días
    }, secret);
    res.json({ token });
};

authCtrl.getToken = async (req, res) => {
    try{
        const token = req.params.token;
        if (!token) {
            return res.status(401).send({ error: "Token no proporcionado" });
        }
    
        const payload = jwt.verify(token, secret)

        if (Date.now() > payload.exp){
            return res.status(401).send({error: "token expired"});
        }
        // Devolver los datos del payload
        res.json({ ID: payload.ID, RUT: payload.RUT, TIPO: payload.TIPO });
    } catch (error) {
        res.status(401).send({error: error.message});
    }
};

module.exports = authCtrl;