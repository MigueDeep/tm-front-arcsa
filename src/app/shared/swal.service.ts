import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  success(message: string, title: string = 'Éxito'): void {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#3085d6'
    })
  }

  error(message: string, title: string = 'Error'): void {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#d33'
    })
  }

  confirm(message: string, title: string = '¿Estás seguro?'): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(result => result.isConfirmed)
  }
}
