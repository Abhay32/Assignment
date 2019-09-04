const IMPORT = require('./import');
const app = IMPORT.express();

app.use(IMPORT.bodyParser.urlencoded({
    extended: false,limit: '50mb'
}));

app.use(IMPORT.bodyParser.json({
    limit: '50mb'
}));

app.use(IMPORT.cors());
app.use('/user', IMPORT.userRoute);
app.use('/product', IMPORT.productRoute);

app.listen(IMPORT.config.port, () => {
    console.log(`Server is running on localhost:${IMPORT.config.port}`);
});