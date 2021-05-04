import {Router} from 'express';
import Pool from '../database';
import {reporteController} from '../controllers/reportesController'

class VentaRoutes{
   public router : Router = Router();

   constructor(){
        this.config();
   }

   config():void{
       this.router.post('/ventasmes',reporteController.verVentasMes);
       this.router.post('/gananciaTotal', reporteController.gananciasTotales);
       this.router.post('/gananciaDetalle', reporteController.gananciasDetalle);
       this.router.post('/gananciaFiltrada', reporteController.gananciaFiltrada);
   }
}

const ventaRoutes   = new VentaRoutes();
export default ventaRoutes.router;