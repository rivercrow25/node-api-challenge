const express = require('express')
const db = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})

router.get('/:id', validateActionsId, (req, res) => {
    db.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})

router.post('/:id', validateAction, (req, res) => {
    req.body.project_id = req.params.id
    db.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({ message: 'error saving action' })
        })
})

router.delete('/:id', validateActionsId, (req, res) => {
    db.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed)
        })
        .catch(() => {
            res.status(500).json({ message: 'error removing action' })
        })
})

router.put('/:id', validateActionsId, (req, res) => {
    db.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ message: 'error saving updated action' })
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

function validateAction(req, res, next) {
    if (req.params.id) {
        if (req.body.description.length > 0 && req.body.description.length < 128 && req.body.notes.length > 0) {
            next()
        } else {
            res.status(400).json({ message: 'please fill out actions form correctly' })
        }
    } else {
        res.status(400), json({ message: 'error please provide a valid id to the url' })
    }
}

module.exports = router