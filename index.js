import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/'));

app.listen(3000, () => {
    console.log("Server is listening at 3000");
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/calculate', (req, res) => {
    const value1 = parseFloat(req.query.value1);
    const value2 = parseFloat(req.query.value2);
    const operation = req.query.operation || 'add';
    const response = { statusCode: 200, message: 'success'};
    const errorResponse = { statusCode: 403, message: 'Invalid input' }
        if (value1 && value2) {
            if(operation =='sub'){
                res.send({...response, data: value1 - value2});
            } else if(operation =='mul') {
                res.send({...response, data: value1 * value2});
            } else if(operation =='div') {
                (value2 !== 0) ?  res.send({...response, data: value1 / value2}) : res.send(errorResponse);
            } else {
                res.send({...response, data: value1 + value2});
            }
        } else {
            res.send(errorResponse)
        }
        res.end();
});