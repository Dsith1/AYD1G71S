import {Router} from 'express';
import Pool from '../database';
import {productController} from '../controllers/productController'

class ProductRoutes{
   public router : Router = Router();

   constructor(){
        this.config();
   }

   config():void{
       this.router.get('/', productController.index );
       this.router.post('/create',productController.create);
       this.router.post('/getProduct',productController.obtenerProd);
       this.router.put('/updateProd',productController.actualizarProd);
       this.router.delete('/deleteProd/:id',productController.eliminarProd);
       this.router.get('/stock',productController.reporteStock);
   }
}

const productRoutes = new ProductRoutes();
export default productRoutes.router;