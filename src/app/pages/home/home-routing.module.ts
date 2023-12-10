import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'crud-usuario',
        loadChildren: () => import('../crud-usuario/crud-usuario.module').then( m => m.CrudUsuarioPageModule)
      },
      {
        path: 'crud-asignatura',
        loadChildren: () => import('../crud-asignatura/crud-asignatura.module').then( m => m.CrudAsignaturaPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'docente/:id',
        loadChildren: () => import('../docente/docente.module').then( m => m.DocentePageModule)
      },
      {
        path: 'qr-code',
        loadChildren: () => import('../qr-code/qr-code.module').then( m => m.QrCodePageModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
