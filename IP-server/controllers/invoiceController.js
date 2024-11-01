const {Invoice, Service} = require('../models');

exports.postInvoiceById = async (req, res, next) => {
    try {
        let {id} = req.params
        let service = await Service.findByPk(id)
        let user = req.user.id
        if (service) await Invoice.create({
            name: service.name,
            price: service.price,
            serviceId: service.id,
            userId: user,
        })
        
        if (!service) throw { name: "NotFound" }
        res.status(200).json(service)
    } catch (error) {
        next(error)
    }
}

exports.getInvoice = async (req, res, next) => {
    try {
        let Invoices = await Invoice.findAll()
        
        res.status(200).json(Invoices)
    } catch (error) {
        next(error)
    }
}