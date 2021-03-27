const db = require('../config/db')
const Habit = require('../models/habits/Habit')
const HabitDayDone = require('../models/habits/HabitDayDone')
const HabitWeekDayTbd = require('../models/habits/HabitWeekdayTbd')
const User = require('../models/User')


const getHabits = async (userId) => {
    var end = new Date()
    var start = (new Date()).setDate(end.getDate() - 7)

    var habits = await Habit.findAll({where: {userId: userId}, include: [
        {
            model: HabitWeekdayTbd,
        },
        {
            model: HabitDayDone,
        }]})
    console.log(habits)
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

module.exports = {addHabit: addHabit, getHabits: getHabits}