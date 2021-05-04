import {Request, Response, text} from 'express'
import pool from '../database'

class VentaController{

    // listar ventas
    public async index (req:Request, res:Response){
        const respuesta = await pool.query('select * from ventas;');
        res.json(respuesta);
    }

    // crear una nueva venta
    public async create (req:Request,res:Response):Promise<void>{
        const usuario = req.body.CodigoUsuario;
        const direccion = req.body.Direccion;
        await pool.query(`insert into ventas ( CodigoUsuario, DireccionEntrega ) values (${usuario}, '${direccion}');`)
        res.status(200).json({respuesta: 'Se creo una nueva venta'});
    }

    //obtener ultima venta para la carga del detalle 
    public async getUltimaVenta (req:Request, res:Response){
        const venta = JSON.parse(JSON.stringify(await pool.query(`select id from ventas
      order by id desc ;`)))[0]
      if(venta == null){
          console.log("No se encontro el id de la venta");
          return res.sendStatus(404);
      }else{
          res.status(200).json(venta);
      }
    }

    //lenar el detalle de la venta
    public async llenarDetalle (req:Request, res:Response){
        const id_venta = req.body.id_venta;
        const id_producto = req.body.id_producto;
        const cantidad_prod = req.body.cantidad;

        await pool.query(`CALL llenar_venta(${id_venta},${id_producto},${cantidad_prod});`)
        res.status(200).json({respuesta: 'Se lleno tupla de detalle de venta asociado a la venta '+ id_venta});
    }

    // mostrar el total de la venta 
    public async valorTotal (req:Request, res:Response){
        const usuario = req.body.CodigoUsuario;
        const id_venta = req.body.id_venta;

        const respuesta = await pool.query(`select u.CodigoUsuario, sum(dv.monto_producto) as total from detalle_venta dv, ventas v, Usuario u
        where dv.id_venta  = v.id
        and v.CodigoUsuario  = u.CodigoUsuario
        and  u.CodigoUsuario = ${usuario}
        and v.id = ${id_venta}
        group by u.CodigoUsuario;`);
        res.status(200).json(respuesta);
    }

    //mostrar los estados
    public async estados (req:Request, res:Response){
        const respuesta = await pool.query('select * from EstadoPedido');
        res.json(respuesta);
    }

    //mostrar los pedidos
    public async pedidos (req:Request, res:Response){
        const respuesta = await pool.query('SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos as Apellidos, v.Fecha_Venta, e.estado   FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario INNER JOIN EstadoPedido e ON v.estado = e.id ORDER BY numero_pedido DESC');
        res.json(respuesta);
    }

    //mostrar los pedidos por cliente
    public async pedidosCliente (req:Request, res:Response){
        const id = await  req.body['CodigoUsuario'];
        const respuesta = await pool.query('SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos as Apellidos, v.Fecha_Venta, e.estado , n.monto FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario INNER JOIN EstadoPedido e ON v.estado = e.id INNER JOIN ( SELECT id_venta as venta, SUM(monto_producto) as monto FROM detalle_venta GROUP BY id_venta ) n ON v.id = n.venta WHERE v.CodigoUsuario = ' + id + ' ORDER BY numero_pedido DESC');
        res.json(respuesta);
    }

    //update del pedido
    public async updatePedido(req:Request,res:Response){
        const id = await  req.body['id'];
        const estado = await  req.body['estado'];
      let u = req.body['id']
      console.log(u)
      await pool.query('update ventas set estado = ' + estado + ' where id = ' + id);        
      res.json({message:"El pedido fue actualizado"});
    }

    // crear una Asociación
    public async create_Asociación (req:Request,res:Response):Promise<void>{
    const venta = req.body.venta;
        
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 8; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
        }

    const Serie = result.join('');
    
    result.push('-')
    for ( var i = 0; i < 4; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
      }
    
    result.push('-')
    for ( var i = 0; i < 4; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
      }

    result.push('-')
    for ( var i = 0; i < 4; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
      }

    result.push('-')
    for ( var i = 0; i < 12; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *  charactersLength)));
      }

    const UUID = result.join('');

        var resultado           = [];
        var numeros       = '0123456789';
        var numerosLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            resultado.push(numeros.charAt(Math.floor(Math.random() *  numerosLength)));
        }

    const Numero = resultado.join('');

    const Referencia=0;
    
    await pool.query(`insert into AutorizacionElectronica ( Venta, Serie,Numero,NUmeroReferencia,UUID ) values (${venta}, '${Serie}', '${Numero}', '${Referencia}', '${UUID}');`)
    res.status(200).json({respuesta: 'Documento Asociado Correctamente'});
 }
    
// crear una datos venta
    public async create_DatosV (req:Request,res:Response):Promise<void>{
    const venta = req.body.CodigoUsuario;
    const direccion = req.body.Direccion;
    const Nit = req.body.nit;
    const nombrefact = req.body.nombrefact;
    await pool.query(`insert into DatosFActuracion ( Venta, Direccion,NumeroNIt,NombreFact ) values (${venta}, '${direccion}', '${Nit}', '${nombrefact}');`)
    res.status(200).json({respuesta: 'Datos Facturación creados'});
}

    
}


export const ventaController = new VentaController();