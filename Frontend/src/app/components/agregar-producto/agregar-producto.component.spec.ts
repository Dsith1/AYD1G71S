import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductoComponent } from './agregar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { privateDecrypt } from 'crypto';

describe('AgregarProductoComponent', () => {
  let component: AgregarProductoComponent;
  let fixture: ComponentFixture<AgregarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProductoComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule.withRoutes([]),
        ReactiveFormsModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component = new AgregarProductoComponent(component.SProductos, component.router);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

    //Pruebas Unitarias nuestras 
    describe('Prueba Agregar Producto', () => {
  
  
      it('Prueba1 ',function()
      {
        component.habilitacion="";
        expect(component.habilitacion).toEqual("");       
      });    
  
      it('Prueba2 ',function()
      {
        component.habilitacion="1";
        expect(component.habilitacion).not.toEqual("");  

      });  
  
      it('Prueba4 ',function()
      {     
        expect(component.existe_categoria()).toBeFalsy(); 
      }); 

    
      it('Prueba5 ',function()
      {       
        component.EnviarDato();
        expect(component.nombre_prod).toEqual(""); 
        expect(component.descripcion).toEqual(""); 
        expect(component.cantidad).not.toBeDefined(null); 
        expect(component.precio_venta).not.toBeDefined(null); 
        expect(component.precio_compra).not.toBeDefined(null); 
        expect(component.categoria).not.toBeDefined(null); 
      }); 

    });

    describe('Prueba Agregar Producto', () => {
      it('Realizar prueba', function () {
        const ProductoEnviar = {
          nombre_prod : '',
          descripcion:'',
          cantidad: 0,
          precio_compra: 0,
          precio_venta: 0,
          categoria: 0
        };
        component.Registrar(ProductoEnviar);
        expect(component.ProductoEnviar).toEqual(ProductoEnviar);  
      });
    });
  
});
