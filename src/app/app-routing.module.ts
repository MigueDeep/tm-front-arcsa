import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    {
      path: 'task',
      loadChildren: () => import('./modules/tasks/task.module').then(m => m.TaskModule),
      canActivate: [AuthGuard]
    },

    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    { path: '**', redirectTo: 'auth/login' }
]

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
