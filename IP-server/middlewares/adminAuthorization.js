

async function adminAuthorization(req, res, next) {
  console.log(req, ">>>ini req");
  try {

    if (req.user.role !== "Admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = adminAuthorization;
