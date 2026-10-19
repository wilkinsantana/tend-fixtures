const msg = import.meta.env.VITE_FIXTURE_MESSAGE || '(unset)'
document.querySelector('#app').innerHTML = '<h1>fixture vite-static OK</h1><p>message: ' + msg + '</p>'
