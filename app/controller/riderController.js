import riderService from "../service/riderService.js";

const submitApplication = async (req, res, next) => {
  try {
    const riderApplication = await riderService.submitApplication(req.body);

    return res.status(201).json({
      success: true,
      message: "Rider application submitted successfully",
      data: { riderApplication },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  submitApplication,
};
