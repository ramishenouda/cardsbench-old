import swal from 'sweetalert';

class Notify {
    static info = (message, title = '') => {
        if (title === '') {
            swal(message);
        } else {
            swal(title, message);
        }
    }

    static success = (title, message) => {
        swal(title, message, 'success');
    }

    static confirm = (message, title, dangerMode, icon) => {
        swal({
            title: title,
            text: message,
            icon: icon,
            buttons: true,
            dangerMode: dangerMode,
        })
        .then((willDo) => {
            if (willDo) {
              swal('Done', {
                icon: 'success',
              });
            } else {
              swal('Canceled', {
                  icon: 'info'
              });
            }
          });
    }
}

export default Notify;
