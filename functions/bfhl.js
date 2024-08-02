const bodyParser = require('body-parser');

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body).data || [];
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

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};
