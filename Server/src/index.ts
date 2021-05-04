import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import provRoutes from './routes/provRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import direccionRoutes from './routes/direccionRoutes';
import ventaRoutes from './routes/ventaRoutes';
import reportesRoutes from './routes/reportesRoutes';
import { reporteController } from './controllers/reportesController';

class Server{
    //creando la aplicacion
    public app:Application;
    constructor(){
      this.app =   express();
      this.config();
      this.routes();
    }

    //configuraciones iniciales del servidor 
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
             res.setHeader(
             "Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept, Authorization, AuthorizationReporter"
                );
             res.setHeader(
             "Access-Control-Allow-Methods",
             "GET, POST, PATCH, PUT, DELETE, OPTIONS"
             );
            next();
            });
    }

    //Manejo de rutas 
    routes():void{
        this.app.use(indexRoutes)
        this.app.use('/products',productRoutes)
        this.app.use('/user',userRoutes)
        this.app.use('/prov',provRoutes)
        this.app.use('/categoria',categoriaRoutes)
        this.app.use('/direccion',direccionRoutes)
        this.app.use('/venta',ventaRoutes)
        this.app.use('/reporte',reportesRoutes)
    }

    //inicializar el server
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Servidor en el puerto ',this.app.get('port'));
        });
    }
}

//inicializacion del server
const server = new Server();
server.start();