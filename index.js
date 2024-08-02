const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const user_id = "SandhyaSankararaman_01042003";
    const email = "ss9403@srmist.edu.in";
    const roll_number = "RA2111003020073";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

    const response = {
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highest_alphabet
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

