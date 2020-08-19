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

    static mixin = (info, progressSteps) => {
        return Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: progressSteps,
            confirmButtonColor: '#333333',
            background: '#141414',
        }).queue(
            info.map(x => {
                return {
                    title: x[0] === undefined ? '' : x[0],
                    text: x[1] === undefined ? '' : x[1],
                    confirmButtonText: x[2] === undefined ? 'Next &rarr;' : x[2]
                }
            })
        );
    }

    static preConfirm = (title, text, confirmButtonText='done', preConfirm) => {
        return Swal.fire({
            title: title,
            text: text,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm,
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    static success = (title, text, showConfirmButton=false, confirmButtonText='', position='top-end') => {
        Swal.fire({
            position: position,
            icon: 'success',
            title: title,
            text: text,
            showConfirmButton: showConfirmButton,
            confirmButtonText: confirmButtonText
        });
    }

    static warning = (title, text, confirmButtonText="Yes, Delete it!", cancelButtonText="Cancel",
            confirmButtonColor="#d33",
            cancelButtonColor="5fd980"
        ) => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: confirmButtonColor,
            cancelButtonColor: cancelButtonColor,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        })
    }

    static error = (title, text, confirmButtonText) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: confirmButtonText
        });
    }
}

export default Notify;
