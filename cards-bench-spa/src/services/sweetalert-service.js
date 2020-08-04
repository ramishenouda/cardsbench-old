import Swal from 'sweetalert2'

class Notify {
    static info = (message, timer = 1500, showConfirmButton = false, position = 'bottom-end') => {
        Swal.fire({
            text: message,
            timer: timer,
            showConfirmButton: showConfirmButton,
            position: position
        });
    }

    static success = (title, message) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: title,
            text: message,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

export default Notify;
