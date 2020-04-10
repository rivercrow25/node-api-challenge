const express = require('express')
const db = require('../data/helpers/projectModel')

const router = express.Router()


router.get('/', (req, res) => {
    db.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})

router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ message: 'server error please try again later' })
        })
})

router.post('/', validateProject, (req, res) => {
    db.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch()
})

router.delete('/:id', validatePorjectId, (req, res) => {
    db.remove(req.params.id)
        .then(removed => {
            res.status(200).json(removed)
        })
        .catch(() => {
            res.status(500).json({ message: 'error removing project' })
        })
})

router.put('/:id', validatePorjectId, validateUpdate, (req, res) => {
    db.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ message: 'error saving updated project' })
        })
})

router.get('/:id/actions', validatePorjectId, (req, res) => {
    db.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            jsons(500).json({ message: 'server error retrieving actions' })
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

function validateProject(req, res, next) {
    if (req.body.name.length > 0 && req.body.description.length > 0) {
        next()
    } else {
        res.status(400).json({ message: 'error project name and description are required' })
    }
}

function validateUpdate(req, res, next) {
    if (req.body.name.length > 0 || req.body.description.length > 0) {
        next()
    } else {
        res.status(400).json({ message: 'Please update either project name or description' })
    }
}

module.exports = router