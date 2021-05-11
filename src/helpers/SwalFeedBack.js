
import Swal from 'sweetalert2';


export function SimpleSwal(title, text, type){
    Swal.fire({
        title: title,
        type: type,
        html: text,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          'OK, entendi!'
      })
}
