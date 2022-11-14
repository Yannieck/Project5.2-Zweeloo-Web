const axios = window.axios;
const swal = window.sweetAlert;
const builder = new fxparser.XMLBuilder({format:true});
const parser = new fxparser.XMLParser();

const register_button = document.getElementById('register_button');

register_button.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_repeat = document.getElementById('password_repeat').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const type = getCookie('contenttype');

    if(type === 'XML') {
        const registerObject = {
            register: {
                user: {
                    email: email,
                    password: password,
                    password_repeat: password_repeat,
                    first_name: first_name,
                    last_name: last_name
                }
            }
        }
        const xml = builder.build(registerObject);
        console.log(xml)

        axios.post('/auth/register', xml, {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/xml', 'Accept': 'application/xml'}
        }).then( (res) => {
            let data = parser.parse(res.data);
            if(type === 'XML') {
                if(data.response.code === 200) {
                    return swal({
                        icon: 'success',
                        toast: true,
                        title: 'Registration succesfull!',
                        text: 'Proceed to login by clicking the OK button.'
                    }).then(() => {
                        window.location = data.response.redirect;
                    });
                } else {
                    return swal({
                        icon: 'error',
                        toast: true,
                        title: 'Registration not succesfull!',
                        text: data.response.error
                    }).then(() => {
                        window.location = data.response.redirect;
                    });
                }
            }
        });
    } else {
        axios.post('/auth/register', {
            email: email,
            password: password,
            password_repeat: password_repeat,
            first_name: first_name,
            last_name: last_name
        }, {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Accept-Type': 'application/json'}
        }).then( (res) => {
            if(type === 'JSON') {
                let data = res.data;
                if(data.code === 200) {
                    return swal({
                        icon: 'success',
                        toast: true,
                        title: 'Registration succesfull!',
                        text: 'Proceed to login.'
                    });
                } else {
                    let data = res.data;
                    return swal({
                        icon: 'error',
                        toast: true,
                        title: 'Registration not succesfull!',
                        text: data.error
                    });
                }
            }
        });
    }
});