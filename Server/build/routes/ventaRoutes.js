"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventaController_1 = require("../controllers/ventaController");
class VentaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ventaController_1.ventaController.index);
        this.router.get('/last', ventaController_1.ventaController.getUltimaVenta);
        this.router.post('/crearVenta', ventaController_1.ventaController.create);
        this.router.post('/llenarDetalle', ventaController_1.ventaController.llenarDetalle);
        this.router.post('/valorTotal', ventaController_1.ventaController.valorTotal);
        this.router.get('/getEstadoPedidos', ventaController_1.ventaController.estados);
        this.router.get('/pedidos', ventaController_1.ventaController.pedidos);
        this.router.put('/updatePedido', ventaController_1.ventaController.updatePedido);
        this.router.post('/misPedidos', ventaController_1.ventaController.pedidosCliente);
        this.router.post('/DatosF', ventaController_1.ventaController.create_DatosV);
        this.router.post('/Asociar', ventaController_1.ventaController.create_Asociación);
    }
}
const ventaRoutes = new VentaRoutes();
exports.default = ventaRoutes.router;
