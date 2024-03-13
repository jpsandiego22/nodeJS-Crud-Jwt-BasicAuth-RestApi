const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const usedTokens = new Set();
const bearerTokenRequest = (req,res) =>{
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.sendStatus(401);
    }
    const data = req.body;
    if(!data.grant_type && data.grant_type !=="client-credentials" )  return res.json({
        status:'failed',
        message: 'Incomplete Parameters'
    });

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    
    const bAuthUsername = process.env.BASIC_AUTH_USERNAME;
    const bAuthPassword = process.env.BASIC_AUTH_PASSWORD;
 
    if (bAuthUsername !== username && bAuthPassword !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secretKey = process.env.SECRET_KEY;
    const tokenIdentifier = uuid.v4();
    const token = jwt.sign({ username: bAuthUsername, tokenIdentifier }, secretKey, { expiresIn: '1h' });
    res.json({ message:"success",token });

}

const validateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secretKey = process.env.SECRET_KEY;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }

        if (usedTokens.has(decoded.tokenIdentifier)) {
            // Token has been used before
            return res.status(401).json({ message: 'Token has already been used' });
        }

        // Mark token as used
        usedTokens.add(decoded.tokenIdentifier);
        
        next();
    });
};
module.exports = {
    bearerTokenRequest,
    validateToken
};
  
