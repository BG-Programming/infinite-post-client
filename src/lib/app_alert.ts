const alertify = require("alertifyjs");

(function onInit() {
    alertify.set('notifier','position', 'top-center');
})();

class AppAlert {
    error(msg : string) {
        alertify.error(msg);
    }
}

const _instance = new AppAlert();
export const appAlert = _instance;