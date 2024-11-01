const {Service} = require('../models');


exports.addService = async (req, res, next) => {
    let { name, region, price, description, imageUrl, type } = req.body
    try {
        let newService = await Service.create({ name, region, price, description, imageUrl, type })
        res.status(201).json({ message: 'Service has been created' })
    } catch (error) {
        next(error)
    }
}


exports.getService = async (req, res, next) => {
    try {
        const { filter } = req.query
        let services = await Service.findAll()
        
        res.status(200).json(services)
    } catch (error) {
        next(error)
    }
}

exports.getServiceById = async (req, res, next) => {
    try {
        let services = await Service.findByPk(req.params.id, {
            include: [User]
        })
        if (!services) throw { name: "NotFound" }
        res.status(200).json(services)
    } catch (error) {
        next(error)
    }
}

exports.putServiceById = async (req, res, next) => {
    let { name, region, price, description, imageUrl, type } = req.body
    let { id } = req.params
    try {
        let services = await Service.findByPk(id)
        if (!services) throw { name: "NotFound" }
        await Service.update({ name, region, price, description, imageUrl, type }, {
            where:  {id}
        })
        res.status(201).json({ message: 'Service has been updated' })
    } catch (error) {
        next(error)
    }
}

exports.deletePostById = async (req, res, next) => {
    try {
        let service = await Service.findByPk(req.params.id)
        if (!service) throw { name: "NotFound" }

        await service.destroy()
        res.status(200).json({ message: 'Service has been deleted' })
    } catch (error) {
        next(error)
    }
} 