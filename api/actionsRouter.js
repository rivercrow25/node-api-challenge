const express = require('express')
const db = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/:id', validateActionsId, (req, res) => {
    db.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})


function validateActionsId(req, res, next) {
    db.get(req.params.id)
        .then(response => {
            if (response) {
                next()
            } else {
                res.status(404).json({ message: 'this action doesnt exist yet' })
            }
        })
        .catch(() => {
            res.status(400).json({ message: 'error invalid id ' })
        })
}

module.exports = router