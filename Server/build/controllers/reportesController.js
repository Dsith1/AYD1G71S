"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporteController = void 0;
const database_1 = __importDefault(require("../database"));
class ReporteController {
    verVentasMes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const anio = req.body.anio;
            const mes = req.body.mes;
            const respuesta = JSON.parse(JSON.stringify(yield database_1.default.query(`
        select  producto.id as 'Codigo_producto', producto.nombre_prod as 'Nombre_Producto', sum(detalle_venta.cantidad) as 'Cantidad_Vendida',
        sum(detalle_venta.monto_producto) as 'Total_Percibido' 
        from ventas, detalle_venta, producto
        where producto.id = detalle_venta.id_producto
        and ventas.id = detalle_venta.id_venta
        and MONTH(ventas.Fecha_Venta) = ${mes}
        and YEAR(ventas.Fecha_Venta) = ${anio}
        group by producto.id, producto.nombre_prod
        order by sum(detalle_venta.cantidad) desc  
        limit 1;
        `)));
            if (respuesta === []) {
                console.log('no se vendieron productos en ese mes y año');
                res.sendStatus(404);
            }
            else {
                res.status(200).json(respuesta);
            }
        });
    }
    //Reportes de ganancias
    gananciasTotales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ganancia = JSON.parse(JSON.stringify(yield database_1.default.query(`select sum(Ganancia) as Ganancia from Ganancias;`)));
            if (ganancia == null) {
                console.log('error obteniendo ganancia');
                res.sendStatus(404);
            }
            else {
                res.status(200).json(ganancia);
            }
        });
    }
    gananciasDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ganancia = JSON.parse(JSON.stringify(yield database_1.default.query(`
        select  producto.id as 'Codigo producto', producto.nombre_prod as 'Nombre Producto',
        sum(detalle_venta.cantidad) as 'Cantidad Vendida' ,
        sum(detalle_venta.monto_producto) as 'Total Percibido', 
        (select producto.precio_compra * sum(detalle_venta.cantidad)) as 'Costo', 
        (sum(detalle_venta.monto_producto) - (select producto.precio_compra * sum(detalle_venta.cantidad)))  as 'Ganancia' 
         from ventas, detalle_venta, producto
        where producto.id = detalle_venta.id_producto
        and ventas.id = detalle_venta.id_venta
        group by producto.id, producto.nombre_prod;
        `)));
            if (ganancia == null) {
                console.log('error obteniendo ganancia');
                res.sendStatus(404);
            }
            else {
                res.status(200).json(ganancia);
            }
        });
    }
    gananciaFiltrada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fechaInicial = req.body.fechaInicial;
            const fechaFinal = req.body.fechaFinal;
            const id_producto = req.body.id_producto;
            if (fechaInicial != '' && fechaFinal != '') {
                if (id_producto == '') {
                    const ganancia = JSON.parse(JSON.stringify(yield database_1.default.query(`
                select  producto.id as 'Codigo producto', producto.nombre_prod as 'Nombre Producto',
                sum(detalle_venta.cantidad) as 'Cantidad Vendida' ,
                sum(detalle_venta.monto_producto) as 'Total Percibido', 
                (select producto.precio_compra * sum(detalle_venta.cantidad)) as 'Costo', 
                (sum(detalle_venta.monto_producto) - (select producto.precio_compra * sum(detalle_venta.cantidad)))  as 'Ganancia' 
                 from ventas, detalle_venta, producto
                where producto.id = detalle_venta.id_producto
                and ventas.id = detalle_venta.id_venta
                and ventas.Fecha_Venta between '${fechaInicial}' and '${fechaFinal}'
                group by producto.id, producto.nombre_prod;
                 `)));
                    if (ganancia == null) {
                        console.log('error obteniendo ganancia');
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200).json(ganancia);
                    }
                }
                else {
                    const ganancia = JSON.parse(JSON.stringify(yield database_1.default.query(`
                select  producto.id as 'Codigo producto', producto.nombre_prod as 'Nombre Producto',
                sum(detalle_venta.cantidad) as 'Cantidad Vendida' ,
                sum(detalle_venta.monto_producto) as 'Total Percibido', 
                (select producto.precio_compra * sum(detalle_venta.cantidad)) as 'Costo', 
                (sum(detalle_venta.monto_producto) - (select producto.precio_compra * sum(detalle_venta.cantidad)))  as 'Ganancia' 
                 from ventas, detalle_venta, producto
                where producto.id = detalle_venta.id_producto
                and ventas.id = detalle_venta.id_venta
                and ventas.Fecha_Venta between '${fechaInicial}' and '${fechaFinal}'
                and producto.id = ${id_producto}
                group by producto.id, producto.nombre_prod;
                 `)));
                    if (ganancia == null) {
                        console.log('error obteniendo ganancia');
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200).json(ganancia);
                    }
                }
            }
            else { //si la fecha viene vacia
                console.log('no se ingresaron fechas');
                res.sendStatus(404);
            }
        });
    }
}
exports.reporteController = new ReporteController();
