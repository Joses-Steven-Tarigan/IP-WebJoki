const { Invoice, Service, User } = require("../models");
const midtransClient = require("midtrans-client");

exports.postInvoiceById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let service = await Service.findByPk(id);
    let user = req.user.id;
    if (service)
      await Invoice.create({
        name: service.name,
        price: service.price,
        serviceId: service.id,
        userId: user,
      });

    if (!service) throw { name: "NotFound" };
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    let Invoices = await Invoice.findAll();

    res.status(200).json(Invoices);
  } catch (error) {
    next(error);
  }
};

exports.deleteInvoiceById = async (req, res, next) => {
  try {
    let invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) throw { name: "NotFound" };

    await invoice.destroy();
    res.status(200).json({ message: "Service has been deleted" });
  } catch (error) {
    next(error);
  }
};

exports.postmidtrans = async (req, res, next) => {
  try {
    let invoices = await Invoice.findAll({
        where: {
          userId: req.user.id, 
        },
      });
    if (invoices.length === 0) {
        return res.status(400).json({ error: 'No invoices found' });
      }
      

    const findUser = await User.findByPk(req.user.id);
    if (!findUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.price, 0);


    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const orderId = "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000);
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        // "first_name": "budi",
        // "last_name": "pratama",
        email: findUser.email,
        username: findUser.username,
        // "phone": "08111222333"
      },
    };
    const midtransToken = await snap.createTransaction(parameter)
    res.status(201).json(midtransToken);
  } catch (error) {
    next(error);
  }
};
