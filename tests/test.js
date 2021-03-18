const assert = require('assert');
const axios = require('axios');
const { title } = require('process');

///

describe('end-to-end', () => {

    var url="localhost:5000"

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
                axios.get(url + "/todo/0")
                var array = res.data
            })
            .then(res => {
                array.sort((a,b) => a.id > b.id ? -1 : 1)
                assert.strictEqual(array[0].title, newTask.title)
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

            var newTask = {
                title: "Vysad strom",
                type: 0
            };

            axios.post(url + "/todo", {
                newTask: newTask
            })
            .then(res => {
                axios.get(url + "/todo/0")
                var array = res.data
            })
            .then(res => {
                array.sort((a,b) => a.id > b.id ? -1 : 1)
                assert.strictEqual(array[0].title, newTask.title)
            })
        })
    })


})

