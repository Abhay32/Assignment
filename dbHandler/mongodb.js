const mongoose =  require('mongoose');
global.Promise = mongoose.Promise;
const config = require('../config/config')();
const DB_URL = `mongodb://localhost/${config.db.name}`;

var againConnect = ()=>{
    setInterval(()=>{
        db_connect();
    },5000)
}

function db_connect(){
    mongoose.connection.openUri(DB_URL, { useNewUrlParser: true });
};
db_connect();

mongoose.connection.on('connected', () =>{ 
    clearInterval(againConnect);
    console.log(`DB connected`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Error in DB connetcion is ${error}`);
});

mongoose.connection.on('disconnected', () => {
    againConnect();
    console.log('DB disconnected')
})