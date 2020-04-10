const express = require('express')
const db = require('../data/helpers/projectModel')

const router = express.Router()


router.get('/:id', validatePorjectId, (req, res) => {
    db.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})


function validatePorjectId(req, res, next) {
    db.get(req.params.id)
        .then(response => {
            if (response) {
                next()
            } else {
                res.status(404).json({ message: 'this project doesnt exist yet' })
            }
        })
        .catch(() => {
            res.status(400).json({ message: 'error invalid id ' })
        })
}

module.exports = router