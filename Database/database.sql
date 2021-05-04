create database ayd1g7;
use ayd1g7;

create table product(
	id int not null auto_increment primary key,
    nombre varchar(50),
    descripcion varchar(150),
    precio int
);

describe product;


/*Por si les llegara a dar un problema de autenticacion se resuelve de esta manera*/
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'propio_password';
-- flush privileges;

/*------------------------------------------------------------------------------------------------------*/
-- creacion de tabla Rol
create table Rol(
	CodigoRol int not null auto_increment primary key,
    Nombre varchar(100) not null
);

-- insert into Rol values(1,'Admin');
-- insert into Rol values(2,'User');
-- insert into Rol values (3,'Client');
-- select * from Rol;


/*------------------------------------------------------------------------------------------------------*/
-- creacion tabla usuario
create table Usuario(
	CodigoUsuario int not null auto_increment primary key,
    Username varchar (50) not null,
    Nombres varchar (50) not null,
    Apellidos varchar (50) not null,
    Correo varchar (50) not null,
    Password varchar (50) not null,
    Genero char not null,
    Fecha_Nacimiento date not null,
    Fecha_Registro timestamp default current_timestamp not null, 
    Fecha_Vencimiento date  default (DATE_ADD(NOW(),INTERVAL 20 DAY)) not null,
    rol int not null,
    foreign key (rol) references Rol(CodigoRol)
);
-- select * from Usuario;


-- Creacion tabla proveedores
create table Proveedor(
	id int not null auto_increment primary key,
    nombre varchar(50) not null,
	direccion varchar(50) not null,
	telefono varchar(12) not null,
	nombre_contacto varchar(50) 	
    
);

describe Proveedor;

/*Ingreso de primer dato para verificacion desde workbench*/
-- insert into Proveedor values (1,'Proveedor1','direccion 1','123456789','Contacto');

-- -------------------------- Para el Sprint 3 ------------------------------
-- tabla categoria
create table categoria(
	id int not null auto_increment primary key,
    categoria varchar(50) not null
);

-- insert into categoria values (1,'Categoria_1');

-- tabla producto
create table producto(
	id int not null auto_increment primary key,
    nombre_prod varchar(70) not null, 
    descripcion varchar(200) not null,
    cantidad int not null,
    precio_compra double not null,
    precio_venta double not null,
    categoria int not null,
    foreign key (categoria) references categoria(id)
);

-- insert into producto values (1,'product1','some description',100,125.00,150.00,1);

-- -------------------------- Para el Sprint 4 ------------------------------

-- Tabla Direccion
create table direccion(
	id int not null auto_increment primary key,
    direccion varchar(255) not null,
    CodigoUsuario int not null,
	foreign key (CodigoUsuario) references Usuario(CodigoUsuario)
);

-- insert into direccion values (1,'direccion1',1);
create table EstadoPedido(
    id int not null auto_increment primary key,
    estado varchar(30)
);

insert into EstadoPedido(estado) values ('Bodega');
insert into EstadoPedido(estado) values ('Preparado');
insert into EstadoPedido(estado) values ('Ruta');
insert into EstadoPedido(estado) values ('Entregado');
insert into EstadoPedido(estado) values ('Cancelada');

-- tablas relacionadas a las ventas
create table ventas(
	id int not null auto_increment primary key,
    CodigoUsuario int not null,
    Fecha_Venta timestamp default current_timestamp not null, 
    DireccionEntrega varchar(255) not null,
    estado int not null DEFAULT 1,
    foreign key (estado) references EstadoPedido(id),
    foreign key (CodigoUsuario) references Usuario(CodigoUsuario)
);

 -- insert into ventas ( CodigoUsuario ) values (1);
-- select * from ventas;

create table detalle_venta(
	id int not null auto_increment primary key,
    id_venta int not null,
    id_producto int not null,
    cantidad int not null,
    precio_unitario int not null,
    monto_producto int not null,
    foreign key (id_venta) references ventas(id),
    foreign key (id_producto) references producto(id)
);


/*insert into detalle_venta values(1,1,1,4,
	(select precio_venta from producto where id = 1 ), 
    (select precio_venta * 4  from producto where id = 1 ));*/
    

-- select * from detalle_venta;
-- procedimiento para llenar tabla de detalle de ventas
DELIMITER $$
CREATE PROCEDURE llenar_venta(IN id_venta int, id_producto int , cantidad int )
BEGIN
    insert into detalle_venta (id_venta,id_producto,cantidad,precio_unitario,monto_producto)
    values(id_venta,id_producto,cantidad,
	(select precio_venta from producto where id = id_producto ), 
    (select precio_venta * cantidad  from producto where id = id_producto ));
    update producto set  producto.cantidad = producto.cantidad - cantidad WHERE producto.id = id_producto;
END$$
DELIMITER ;

-- drop procedure llenar_venta;
-- CALL llenar_venta(1,1,3);

/*select u.CodigoUsuario, sum(dv.monto_producto) as total from detalle_venta dv, ventas v, Usuario u
where dv.id_venta  = v.id
and v.CodigoUsuario  = u.CodigoUsuario
and  u.CodigoUsuario = 1
and v.id = 6
group by u.CodigoUsuario;*/

-- consulta de pedidos
SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos, v.Fecha_Venta, e.estado  
FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario
INNER JOIN EstadoPedido e ON v.estado = e.id
ORDER BY numero_pedido DESC;

SELECT v.id as numero_pedido, u.Username, u.Nombres, u.apellidos, v.Fecha_Venta, e.estado , n.monto 
FROM ventas v INNER JOIN Usuario u ON v.CodigoUsuario = u.CodigoUsuario
INNER JOIN EstadoPedido e ON v.estado = e.id
INNER JOIN (
    SELECT id_venta as venta, SUM(monto_producto) as monto 
    FROM detalle_venta
    GROUP BY id_venta
) n ON v.id = n.venta
WHERE v.CodigoUsuario = 2
ORDER BY numero_pedido DESC;

SELECT id_venta as venta, SUM(monto_producto) as monto 
FROM detalle_venta
GROUP BY id_venta;


Create Table DatosFActuracion(
	correlativo			int not null auto_increment primary key,
	Venta				int not null,
    Direccion			varchar(50) not null,
    NumeroNIt			varchar(20) not null,
    NombreFact			varchar(50) not null,
	foreign key (Venta) references ventas(id)
);


Create Table AutorizacionElectronica(
	correlativo			int not null auto_increment primary key,
	Venta				int not null,
    Serie 				varchar(50) not null,
    Numero				decimal(9) not null,
    NUmeroReferencia	decimal(17) not null,
    UUID				varchar(50) not null,
    FechaAnulacion		decimal(8) null,
	foreign key (Venta) references ventas(id)
); 

-- consulta de reportes
/**Consulta de producto mas vendido por mes y año */
select  producto.id as 'Codigo producto', producto.nombre_prod as 'Nombre Producto', sum(detalle_venta.cantidad) as 'Cantidad Vendida' from ventas, detalle_venta, producto
where producto.id = detalle_venta.id_producto
and ventas.id = detalle_venta.id_venta
and MONTH(ventas.Fecha_Venta) = 3
and YEAR(ventas.Fecha_Venta) = 2021
group by producto.id, producto.nombre_prod
order by sum(detalle_venta.cantidad) desc  
limit 1;

/***Para total percibido en ganancias**/
create or replace view Ganancias
as
select  producto.id as 'Codigo producto', producto.nombre_prod as 'Nombre Producto',
sum(detalle_venta.cantidad) as 'Cantidad Vendida' ,
sum(detalle_venta.monto_producto) as 'Total Percibido', 
(select producto.precio_compra * sum(detalle_venta.cantidad)) as 'Costo', 
(sum(detalle_venta.monto_producto) - (select producto.precio_compra * sum(detalle_venta.cantidad)))  as 'Ganancia' 
 from ventas, detalle_venta, producto
where producto.id = detalle_venta.id_producto
and ventas.id = detalle_venta.id_venta
group by producto.id, producto.nombre_prod;

select sum(Ganancia) from Ganancias;

/*Filtrando*/