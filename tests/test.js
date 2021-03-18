const assert = require('assert');
const axios = require('axios');
const { title } = require('process');

///

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
    
    describe('create task', () => {

        before(() => {
            axios.post(url + '/user/login', 
            {email: "jozko.mrkvicka@gmail.com", password: "jozko123"})
            .then((res) => {
                token = res.data.token
            })
        })
    
        it('new task', () => {
    
            var newTask = {
                title: "Polej kvety",
                type: 0
            };
    
            axios.post(url + "/todo", {newTask: newTask}, {headers: {"Authorization": `Bearer ${token}`}
            })
            .then(res => {
                axios.get(url + "/todo/userid")
                var array = res.data
            })
            .then(res => {
                array.sort((a,b) => a.id > b.id ? -1 : 1)
                assert.strictEqual(array[0].title, newTask.title)
                assert.strictEqual(array[0].type, newTask.type)
            })
        })
    })

    describe('create habit', () => {

        before(() => {
            axios.post(url + '/user/login', {email: "jozko.mrkvicka@gmail.com", password: "jozko123"
        })
            .then((res) => {
                token = res.data.token
            })
        })
    
    
    
        it('new habit', () => {
    
        var newHabit = {
            title: "Presad kvety",
            type: 1,
            perWeek: 1
        };
    
        axios.post(url + "/habit", {newHabit: newHabit}, {headers: {"Authorization": `Bearer ${token}`}
        })
            .then(res => {
                axios.get(url + "/habit/userid")
                var array = res.data
            })
            .then(res => {
                array.sort((a,b) => a.id > b.id ? -1 : 1)
                assert.strictEqual(array[0].title, newHabit.title)
                assert.strictEqual(array[0].type, newHabit.type)
                assert.strictEqual(array[0].perWeek, newHabit.perWeek)
            })
        })
    })



    // negative test - no title 
    describe('create task no title', () => {

        before(() => {
            axios.post(url + '/user/login', 
            {email: "jozko.mrkvicka@gmail.com", password: ""})
            .then((res) => {
                token = res.data.token
            })
        })

        it('new task', () => {

            var newTask = {
                title: null,
                type: 0
            };

            axios.post(url + "/todo", {newTask: newTask}, {headers: {"Authorization": `Bearer ${token}`}
            })
            .then(res => {
                axios.get(url + "/todo/userid")
                var array = res.data
            })
            .then(res => {
                array.sort((a,b) => a.id > b.id ? -1 : 1)
                assert.strictEqual(array[0].title, newTask.title) // this fails, array[0] should not have title "null", null is not allowed!
                assert.strictEqual(array[0].type, newTask.type)
            })
        })
    })
    
})

