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

  //upddate del producto
  public async actualizarProd(req:Request,res:Response){
    const {id} = req.body['id']
    console.log(req.body['id'])
    let u = req.body['id']
    console.log(u)
    await pool.query('update producto set ? where id = ?', [req.body, u]);        
    res.json({message:"El producto fue actualizado"});
  }

  //eliminar un producto
  public async eliminarProd(req:Request,res:Response){
   
    const { id } = req.params
    console.log(req.params)
    await pool.query('DELETE FROM producto WHERE id = ?',[id]);
    res.json({message:"El producto fue eliminado"});
}

  //reporte stock producto 
  public async reporteStock (req:Request,res:Response){
    const respuesta = await pool.query('select  nombre_prod, cantidad, precio_compra, precio_venta from producto');
     res.json(respuesta);
 }

}

export const productController = new ProductController();