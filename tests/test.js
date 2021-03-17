const assert = require('assert');
const axios = require('axios');

describe('end-to-end', () => {

    var url = "localhost:5000/api"
    describe('user account', () => {

        const userDetails = {
            email: 'jozko.mrkvicka@gmail.com', 
            password: 'heslo123', 
            birthday: '2015-03-25'
        }

        it('register and login', () => {

            axios.post(url + '/user', {email: userDetails.email, password: userDetails.password, birthday: userDetails.birthday})
                .then((res) => {
                    // checks if user was created successfully
                    assert.strictEqual(res.status, 201)
                    axios.post(url + '/user/login', {email: userDetails.email, password: userDetails.password})
                })
                .then((res) => {
                    // checks if token was returned
                    assert.notStrictEqual(res.data.token, undefined)
                })
        })

        it('login and retrieve account', () => {

            var token;

            axios.post(url + '/user/login', {email: userDetails.email, password: userDetails.password})
                .then((res) => {
                    // checks if token was returned
                    assert.notStrictEqual(res.data.token, undefined)
                    token = res.data.token
                    axios.get(url + '/user', {headers: {"Authorization": `Bearer ${token}`}})
                })
                .then((res) => {
                    assert.strictEqual(res.data.email, userDetails.email)
                    assert.strictEqual(res.data.password, userDetails.password)
                    assert.strictEqual(res.data.birthDate, userDetails.birthday)
                })
        })

        it('change user details', () => {
            var token;

            axios.post(url + '/user/login', {email: userDetails.email, password: userDetails.password})
                .then((res) => {
                    // checks if token was returned
                    assert.notStrictEqual(res.data.token, undefined)
                    token = res.data.token
                    // change to blank password
                    axios.put(url + '/user', {
                        email: 'jozko.mrkvickagmail.com', 
                        password: '', 
                        birthday: '2015-03-25'
                    } ,{headers: {"Authorization": `Bearer ${token}`}})
                })
                .then((res) => {
                    assert.strictEqual(res.status, 400)
                    axios.get(url + '/user', {headers: {"Authorization": `Bearer ${token}`}})
                }) 
                .then((res) => {
                    // check if data remained unchanged in database
                    assert.strictEqual(res.data.email, userDetails.email)
                    assert.strictEqual(res.data.password, userDetails.password)
                    assert.strictEqual(res.data.birthDate, userDetails.birthday)
                })
        })


    
})

