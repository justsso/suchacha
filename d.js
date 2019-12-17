const axios = require('axios');

function zhixing() {

    axios({
        method: 'post',
        data: {
            your_name: 'jkjk',
            age: '18'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'http://localhost:3000/info'
    }).then(res => {
        console.log(res.data, 11);
    });
}

zhixing();
