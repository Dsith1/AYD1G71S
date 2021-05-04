"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const provRoutes_1 = __importDefault(require("./routes/provRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
const direccionRoutes_1 = __importDefault(require("./routes/direccionRoutes"));
const ventaRoutes_1 = __importDefault(require("./routes/ventaRoutes"));
const reportesRoutes_1 = __importDefault(require("./routes/reportesRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //configuraciones iniciales del servidor 
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, AuthorizationReporter");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
    }
    //Manejo de rutas 
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/products', productRoutes_1.default);
        this.app.use('/user', userRoutes_1.default);
        this.app.use('/prov', provRoutes_1.default);
        this.app.use('/categoria', categoriaRoutes_1.default);
        this.app.use('/direccion', direccionRoutes_1.default);
        this.app.use('/venta', ventaRoutes_1.default);
        this.app.use('/reporte', reportesRoutes_1.default);
    }
    //inicializar el server
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto ', this.app.get('port'));
        });
    }
}
//inicializacion del server
const server = new Server();
server.start();
