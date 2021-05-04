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
exports.ventaController = void 0;
const database_1 = __importDefault(require("../database"));
class VentaController {
    // listar ventas
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('select * from ventas;');
            res.json(respuesta);
        });
    }
    // crear una nueva venta
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.CodigoUsuario;
            const direccion = req.body.Direccion;
            yield database_1.default.query(`insert into ventas ( CodigoUsuario, DireccionEntrega ) values (${usuario}, '${direccion}');`);
            res.status(200).json({ respuesta: 'Se creo una nueva venta' });
        });
    }
    //obtener ultima venta para la carga del detalle 
    getUltimaVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const venta = JSON.parse(JSON.stringify(yield database_1.default.query(`select id from ventas
      order by id desc ;`)))[0];
            if (venta == null) {
                console.log("No se encontro el id de la venta");
                return res.sendStatus(404);
            }
            else {
                res.status(200).json(venta);
            }
        });
    }
    //lenar el detalle de la venta
    llenarDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_venta = req.body.id_venta;
            const id_producto = req.body.id_producto;
            const cantidad_prod = req.body.cantidad;
            yield database_1.default.query(`CALL llenar_venta(${id_venta},${id_producto},${cantidad_prod});`);
            res.status(200).json({ respuesta: 'Se lleno tupla de detalle de venta asociado a la venta ' + id_venta });
        });
    }
    // mostrar el total de la venta 
    valorTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.CodigoUsuario;
            const id_venta = req.body.id_venta;
            const respuesta = yield database_1.default.query(`select u.CodigoUsuario, sum(dv.monto_producto) as total from detalle_venta dv, ventas v, Usuario u
        where dv.id_venta  = v.id
        and v.CodigoUsuario  = u.CodigoUsuario
        and  u.CodigoUsuario = ${usuario}
        and v.id = ${id_venta}
        group by u.CodigoUsuario;`);
            res.status(200).json(respuesta);
        });
    }
    //mostrar los estados
    estados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('select * from EstadoPedido');
            res.json(respuesta);
        });
    }
    //mostrar los pedidos
    pedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos as Apellidos, v.Fecha_Venta, e.estado   FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario INNER JOIN EstadoPedido e ON v.estado = e.id ORDER BY numero_pedido DESC');
            res.json(respuesta);
        });
    }
    //mostrar los pedidos por cliente
    pedidosCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield req.body['CodigoUsuario'];
            const respuesta = yield database_1.default.query('SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos as Apellidos, v.Fecha_Venta, e.estado , n.monto FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario INNER JOIN EstadoPedido e ON v.estado = e.id INNER JOIN ( SELECT id_venta as venta, SUM(monto_producto) as monto FROM detalle_venta GROUP BY id_venta ) n ON v.id = n.venta WHERE v.CodigoUsuario = ' + id + ' ORDER BY numero_pedido DESC');
            res.json(respuesta);
        });
    }
    //update del pedido
    updatePedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield req.body['id'];
            const estado = yield req.body['estado'];
            let u = req.body['id'];
            console.log(u);
            yield database_1.default.query('update ventas set estado = ' + estado + ' where id = ' + id);
            res.json({ message: "El pedido fue actualizado" });
        });
    }
    // crear una Asociación
    create_Asociación(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const venta = req.body.venta;
            var result = [];
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 8; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            const Serie = result.join('');
            result.push('-');
            for (var i = 0; i < 4; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            result.push('-');
            for (var i = 0; i < 4; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            result.push('-');
            for (var i = 0; i < 4; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            result.push('-');
            for (var i = 0; i < 12; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            const UUID = result.join('');
            var resultado = [];
            var numeros = '0123456789';
            var numerosLength = characters.length;
            for (var i = 0; i < 10; i++) {
                resultado.push(numeros.charAt(Math.floor(Math.random() * numerosLength)));
            }
            const Numero = resultado.join('');
            const Referencia = 0;
            yield database_1.default.query(`insert into AutorizacionElectronica ( Venta, Serie,Numero,NUmeroReferencia,UUID ) values (${venta}, '${Serie}', '${Numero}', '${Referencia}', '${UUID}');`);
            res.status(200).json({ respuesta: 'Documento Asociado Correctamente' });
        });
    }
    // crear una datos venta
    create_DatosV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const venta = req.body.CodigoUsuario;
            const direccion = req.body.Direccion;
            const Nit = req.body.nit;
            const nombrefact = req.body.nombrefact;
            yield database_1.default.query(`insert into DatosFActuracion ( Venta, Direccion,NumeroNIt,NombreFact ) values (${venta}, '${direccion}', '${Nit}', '${nombrefact}');`);
            res.status(200).json({ respuesta: 'Datos Facturación creados' });
        });
    }
}
exports.ventaController = new VentaController();
