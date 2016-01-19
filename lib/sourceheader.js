(function () {
    var signedIn = false;
    var signedInClass = 'signedin';

    var header = document.getElementById('sourceheader');
    var user = document.getElementById('sourceuser');

    var sourceLogin = function (name) {
        signedIn = true;
        if (header) {
            header.classList.add(signedInClass);
        }
        if (user) {
            user.innerHTML = name;
        }
    };

    var sourceLogout = function () {
        if (header) {
            header.classList.remove(signedInClass);
        }
        if (user) {
            user.innerHTML = '';
        }
    };

    window.addEventListener('message', function (e) {
        if (e.origin === 'https://madebysource.com' || e.origin === location.origin) {
            var data = e.data.split(';');
            if (data[0] === 'signedout') {
                window.sessionStorage.removeItem('sourceUser');
                if (signedIn) {
                    sourceLogout();
                }
            } else if (data[0] === 'signedin' && data.length === 2) {
                var name = data[1];
                window.sessionStorage.setItem('sourceUser', name);
                if (!signedIn) {
                    sourceLogin(name);
                }
            }
        }
    });

    var name = window.sessionStorage && window.sessionStorage['sourceUser'];
    if (name) {
        sourceLogin(name);
    }

    var s = document.createElement('script');
    s.src = 'https://madebysource.com/api/user-bridge/pictura/';
    s.defer = 'defer';
    document.getElementsByTagName('head')[0].appendChild(s);
})();
