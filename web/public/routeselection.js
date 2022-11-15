const axios = window.axios;
const parser = new fxparser.XMLParser();

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const type = getCookie('contenttype');

if(type === 'XML') {
    axios.get('/api/routes/allroutesnames', {
        headers: {'Content-Type': 'application/xml', 'Accept': 'application/xml'}
    }).then((response) => {
        const data = parser.parse(response.data);
        if (response.status === 200) {
            if(data) {
                Object.keys(data.routes).forEach((key) => {
                    addElementXML(data.routes[key])
                })
            }
        }
    });
} else {
    axios.get('/api/routes/allroutes', {
        headers: {'Content-Type': 'application/json', 'Accept-Type': 'application/json'}
    }).then((response) => {
        if (response.status === 200) {
            const data = response.data;
             if(data.length > 0) {
                data.forEach((item) => {
                    addElementJSON(item);
                });
            }
        }
    });
}

function addElementXML(data) {
    const main = document.getElementById('route_selection')
    const a = document.createElement('a');
    a.classList.add('grid', 'grid-rows-1', 'font-sans', 'rounded-lg', 'my-2', 'clr-bg-main');
    a.href = '/routeeditor/' + data.data.id;
    main.appendChild(a);

    const div1 = document.createElement('div');
    div1.classList.add('p-3', 'shadow-sm', 'rounded-sm');
    a.appendChild(div1);

    const div2 = document.createElement('div');
    div2.classList.add('flex', 'items-center', 'space-x-2', 'font-semibold', 'leading-8', 'clr-bg-sec');
    div1.appendChild(div2);

    const span = document.createElement('span');
    span.classList.add('p-4', 'tracking-wide');
    span.innerText = data.data.name;
    div2.appendChild(span);
}

function addElementJSON(data) {
    const main = document.getElementById('route_selection')
    const a = document.createElement('a');
    a.classList.add('grid', 'grid-rows-1', 'font-sans', 'rounded-lg', 'my-2', 'clr-bg-main');
    a.href = '/routeeditor/' + data.id;
    main.appendChild(a);

    const div1 = document.createElement('div');
    div1.classList.add('p-3', 'shadow-sm', 'rounded-sm');
    a.appendChild(div1);

    const div2 = document.createElement('div');
    div2.classList.add('flex', 'items-center', 'space-x-2', 'font-semibold', 'leading-8', 'clr-bg-sec');
    div1.appendChild(div2);

    const span = document.createElement('span');
    span.classList.add('p-4', 'tracking-wide');
    span.innerText = data.name;
    div2.appendChild(span);
}