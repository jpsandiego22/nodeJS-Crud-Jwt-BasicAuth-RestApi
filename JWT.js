const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const uuid = require('uuid'); // Install using npm install uuid

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'your_secret_key';

// Mock database to store used token identifiers
const usedTokens = new Set();

app.use(bodyParser.json());

// Mock user data (replace with your actual user data storage)
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpassword', role: 'admin' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const tokenIdentifier = uuid.v4(); // Generate unique identifier
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role, tokenIdentifier }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

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
        req.user = decoded;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
