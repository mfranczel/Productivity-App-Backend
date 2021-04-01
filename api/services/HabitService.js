const db = require('../config/db')
const Habit = require('../models/habits/Habit')
const HabitDayDone = require('../models/habits/HabitDayDone')
const HabitWeekDayTbd = require('../models/habits/HabitWeekdayTbd')
const User = require('../models/User')


const getHabits = async (userId) => {

    var habits = await Habit.findAll({where: {userId: userId}, include: [
        {
            model: HabitWeekDayTbd,
        },
        {
            model: HabitDayDone,
        }]})
    return habits

}  

const addHabit = async (userId, type, text, days) => {

    if (type === "monthly") {
        await Habit.create({
            type: type,
            text: text,
            userId: userId,
            repetitions: days
        })
    } else if (type === "weekly") {
        var habit = await Habit.create({
            type: type,
            text: text,
            userId: userId,
        })

        for (const d of days) {
            await HabitWeekDayTbd.create({
                day: d,
                habitId: habit.id
            })
        }
    } else {
        await Habit.create({
            type: type,
            text: text,
            userId: userId
        })
    }

}

const remove = async (userId, habitId) => {
    var habit = await Habit.findOne({where: {userId: userId, id: habitId}})
    
    if (habit === null) {
        throw "habit not found"
    } else {
        r.destroy()
    }
}

const addHabitLog = async (userId, habitId, action) => {
    var habit = await Habit.findOne({where: {userId: userId, id: habitId}})
    if (habit == null) {
        throw "Habit with user id not found"
    } else {
        if (action === "complete") {
            await HabitDayDone.create({
                date: new Date(),
                habitId: habitId
            })
        } else if (action === "undo") {
            await HabitDayDone.findAll({where: {habitId: habitId}})
                .then(h => {
                    var found = false
                    h.forEach(e => {
                        var dateA = e.date.getFullYear() + "-" + (e.date.getMonth()+1) + "-" + e.date.getDate()
                        var dateB = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate()

                        if (dateA === dateB) {
                            e.destroy()
                            found = true
                        }
                    })
                    if (!found) {
                        throw "Habit completion not found"
                    }
                })
                .catch(err => {
                    throw err
                })
        }
    }
}

module.exports = {addHabit: addHabit, getHabits: getHabits, remove: remove, addHabitLog: addHabitLog}