const {Invoice, Service} = require('../models');

exports.postInvoiceById = async (req, res, next) => {
    try {
        let {id} = req.body
        let service = await Service.findByPk(id)
        let user = req.user.id
        if (service) await Invoice.create({
            serviceId: service.id,
            userId: user,
        })
        
        if (!service) throw { name: "NotFound" }
        res.status(200).json(service)
    } catch (error) {
        next(error)
    }
}