import { Routes } from '@angular/router';
import { Proyectos } from '../app/Features/proyectos/proyectos';
import { Login } from '../app/Features/login/login'
import { Registro } from '../app/Features/registro/registro'
import { Tareas } from '../app/Features/tareas/tareas'
import { AuthGuard } from '../app/Guards/auth.guard'


export const routes: Routes = [

  {
    path: 'login',
    component: Login,

  },
  {
    path: 'registro',
    component: Registro,

  },
  {
    path: 'proyectos',
    component: Proyectos,
    canActivate: [AuthGuard]  
  },
  {
    path: 'tareas/:id',
    component: Tareas,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
  }
]