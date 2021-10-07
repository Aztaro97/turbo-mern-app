const asyncHandler = require("express-async-handler");
const advertising = require("../../models/advertisingModels/AdvertisingserviceModel");

// @desc    Create new parter advertising
// @route   POST /api/advertising
// @access  Public
const addAdvertisingService = asyncHandler(async (req, res) => {
  const {
    companyName,
    about,
    typeBusiness,
    fullName,
    telephone,
    email,
    city,
    country,
    region,
  } = req.body;

  const newService = new advertising({
    user: req.user._id,
    companyName,
    about,
    typeBusiness,
    fullName,
    telephone,
    email,
    city,
    country,
    region,
  });

  const createService = await newService.save();
  res.status(200).json(createService);
});


const registerPremiumService = asyncHandler(async (req, res) => {
  const {
    companyName,
    about,
    typeBusiness,
    fullName,
    telephone,
    email,
    city,
    country,
    region,
    productsOrdered,
    totalPrice
  } = req.body;

  const newService = new advertising({
    user: req.user._id,
    isPaid: true,
    typePlan:"premium",
    companyName,
    about,
    typeBusiness,
    fullName,
    telephone,
    email,
    city,
    country,
    region,
    productsOrdered,
    totalPrice
  });

  const createService = await newService.save();
  res.status(200).json(createService);
});

const getAllAdService = asyncHandler(async (req, res) => {
  try {
    const allService = await advertising.find();

    if (allService) {
      res.status(200).json(allService);
    }
  } catch (error) {
    console.log(error);
  }
});

const filterByTypeBusiness = asyncHandler(async (req, res) => {
  const filter = await advertising.find({
    typeBusiness: req.body.typeBusiness,
    allow:true
  });

  if (filter) {
    res.status(200).json(filter);
  } else {
    res.status(404).json("Product not fund");
  }
});


const getAdProfile = asyncHandler(async (req, res) => {
  const profile = await advertising.findById(req.params.id);

  if (profile ) {
    res.status(200).json(profile);
  } else {
    res.status(404)
    throw new Error("Profile not fund")
  }
})


const setUpdateAllowed = asyncHandler(async (req, res) => {
  const service = await advertising.findById(req.body.id);
  if (service) {
    service.allow = req.body.allow;
    const updateService = await service.save();
    res.status(200).json(updateService)
  } else {
    res.status(404);
    throw new Error("AD not fund")
  }
})


module.exports = {
  addAdvertisingService,
  getAllAdService,
  filterByTypeBusiness,
  getAdProfile,
  registerPremiumService,
  setUpdateAllowed
};
