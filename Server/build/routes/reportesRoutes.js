"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportesController_1 = require("../controllers/reportesController");
class VentaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/ventasmes', reportesController_1.reporteController.verVentasMes);
        this.router.post('/gananciaTotal', reportesController_1.reporteController.gananciasTotales);
        this.router.post('/gananciaDetalle', reportesController_1.reporteController.gananciasDetalle);
        this.router.post('/gananciaFiltrada', reportesController_1.reporteController.gananciaFiltrada);
    }
}
const ventaRoutes = new VentaRoutes();
exports.default = ventaRoutes.router;
