import {Request, Response} from 'express';
import pool from '../database'

class ProductController{

   public async index (req:Request,res:Response){
       const respuesta = await pool.query('select * from producto');
        res.json(respuesta);
    }

      // Creación de productos
      public async create (req:Request,res:Response):Promise<void>{
        await pool.query('insert into producto set ?',[req.body])
        res.json({respuesta: 'Se creo un nuevo producto'});
    }

    public async obtenerProd(req:Request,res:Response){
      const {id} = req.body
      console.log(req.body);
      const prod = JSON.parse(JSON.stringify(await pool.query(`select * from producto
      where id = '${id}' ;`)))[0]
      if(prod == null){
          console.log("No se encontro el producto");
          return res.sendStatus(404);
      }else{
          res.json({prod});
      }
  }
}

export const productController = new ProductController();