const axios = window.axios;
const swal = window.sweetAlert;
const builder = new fxparser.XMLBuilder({format:true});
const parser = new fxparser.XMLParser();

const login_button = document.getElementById('login_button');

login_button.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const type = getCookie('contenttype');

    if(type === 'XML') {
        const loginObject = {
            login: {
                user: {
                    email: email,
                    password: password
                }
            }
        };
        const xml = builder.build(loginObject);
        axios.post('/auth/login', xml,{
            headers: {'Content-Type': 'application/xml', 'Accept': 'application/xml'}
        }).then((res) => {
            let data = parser.parse(res.data);
            if(type === 'XML') {
                if(data.response.code === 200) {
                    return swal({
                        icon: 'success',
                        toast: true,
                        title: 'Login succesfull!'
                    }).then(() => {
                        window.location = data.response.redirect;
                    })
                } else {
                    return swal({
                        icon: 'error',
                        toast: true,
                        title: 'Login failed!',
                        text: data.response.error
                    }).then(() => {
                        window.location = data.response.redirect;
                    });
                }
            }
        });
    } else {
        axios.post('/auth/login', {
            email: email,
            password: password
        }, {
            headers: {'Content-Type': 'application/json', 'Accept-Type': 'application/json'}
        }).then((res) => {
            if(type === 'JSON') {
                let data = res.data;
                if(data.code === 200) {
                    return swal({
                        icon: 'success',
                        toast: true,
                        title: 'Login succesfull!'
                    }).then(() => {
                        window.location = data.redirect;
                    })
                } else {
                    return swal({
                        icon: 'error',
                        toast: true,
                        title: 'Login failed!',
                        text: data.response.error
                    }).then(() => {
                        window.location = data.response.redirect;
                    });
                }
            }
        });
    }
});