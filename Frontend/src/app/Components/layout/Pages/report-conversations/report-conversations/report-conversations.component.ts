import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Conversation } from 'app/interfaces/conversation.interface';
import { addDays } from 'date-fns';
import { format } from 'date-fns';
import { MatSort } from '@angular/material/sort';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-report-conversations',
  templateUrl: './report-conversations.component.html',
  styleUrl: './report-conversations.component.css'
})

export class ReportConversationsComponent {

  formularioFiltro: FormGroup;
  listaConversations: Conversation[] = [];

  columnasTabla: string[] = ['nombreLaboratorio', 'presupuestoLaboratorio', 'ventaMes', 'fechaUltimaVenta'];

  dataVentaReporte = new MatTableDataSource(this.listaConversations);


  mostrarProgressBar: boolean = false;


  date = new FormControl(new Date());
  minDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate());  // desde un año atrás
  maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());  // hasta un año adelante


  gridCols: number = 4; // Inicialmente, 4 columnas

  constructor(
    private fb: FormBuilder,
  ) {


    const today = new Date();
    const fechaInicioDefault = addDays(today, -2);

    this.formularioFiltro = this.fb.group({
      fechaInicio: [fechaInicioDefault, Validators.required],
      fechaFin: [today, Validators.required]
    })

  }







  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;



  @ViewChild(MatSort) sort!: MatSort;




  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateGridCols();
  }

  updateGridCols() {
    this.gridCols = window.innerWidth >= 767 ? 4 : 1;
  }


  ngOnInit() {
    this.updateGridCols();

  }

  chosenYearHandler(normalizedYear: Date, datepicker: any) {
    const ctrlValue = this.date.value || new Date(); // Asegurarse de que siempre hay un valor de fecha
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.date.setValue(new Date(ctrlValue)); // Crea una nueva instancia de Date con el valor actualizado
    datepicker.close();
  }

  chosenMonthHandler(normMonth: Date, datepicker: any) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue?.setMonth(normMonth.getMonth());
    this.date.setValue(new Date(ctrlValue));
    datepicker.close();
  }

  ngAfterViewInit(): void {
    console.log('this.dataVentaReporte.sort ');
    this.dataVentaReporte.sort = this.sort;

    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataVentaReporte.filter = filterValue.trim().toLocaleLowerCase();

    //console.log('this.datosListaVenta.filter ' + this.datosListaVenta.filter);
    //console.log('datosListaVenta ' + JSON.stringify(this.datosListaVenta));

  }


  inputFecha() {
    console.log('this.formularioFiltro.value.fechaInicio ' + this.formularioFiltro.value.fechaInicio);
  }

  buscarVentas() {

    const _fechaInicio = format(new Date(this.formularioFiltro.value.fechaInicio), 'dd/MM/yyyy');
    const _fechaFin = format(new Date(this.formularioFiltro.value.fechaFin), 'dd/MM/yyyy');

    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      return;
    }

    this.mostrarProgressBar = true; // Mostrar la barra de progreso

  }


  exportarExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaConversations);

    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, "Reporte Ventas.xlsx");

  }



}
