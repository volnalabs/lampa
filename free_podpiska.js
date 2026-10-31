(function () {
    'use strict';

    // ====== ЕДИНЫЕ ДАННЫЕ ДЛЯ ВСЕХ УСТРОЙСТВ ======
    var USER_DATA = {
        email: 'andrejufa58@gmail.com',
        // Постоянный UID (можно вписать свой, если уже есть привязанный в личном кабинете)
        uid: 'bdfrty12d'
    };

    var KEYS = {
        email: 'account_email',
        uid: 'lampac_unic_id'
    };

    function ls(name) {
        try { return localStorage.getItem(name) || ''; } catch (e) { return ''; }
    }

    function lsSet(name, value) {
        try { localStorage.setItem(name, value); } catch (e) {}
    }

    function notify(text) {
        try { Lampa.Noty.show(text); } catch (e) { console.log('[zprem]', text); }
    }

    function start() {
        var currentEmail = ls(KEYS.email);
        var currentUid = ls(KEYS.uid);
        var changed = false;

        // Проверяем и перезаписываем email, если он отличается
        if (currentEmail !== USER_DATA.email) {
            lsSet(KEYS.email, USER_DATA.email);
            changed = true;
        }

        // Проверяем и перезаписываем UID, чтобы он был одинаковым везде
        if (currentUid !== USER_DATA.uid) {
            lsSet(KEYS.uid, USER_DATA.uid);
            changed = true;
        }

        // Уведомляем только один раз при смене данных на устройстве
        if (changed) {
            notify('Данные аккаунта синхронизированы: ' + USER_DATA.email);
        }
    }

    if (window.appready) start();
    else if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();
