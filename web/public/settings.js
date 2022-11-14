let select = document.getElementById('contenttype');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const type = getCookie('contenttype');

if(type === 'XML') {
    select.value = 'XML';
} else {
    select.value = 'JSON';
}