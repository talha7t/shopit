const FAQ = require("../models/FAQ");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// @desc        get all questions
// @route       GET /api/questions
// @access      Public

const getQuestions = catchAsyncErrors(async (req, res, next) => {
  const questions = await FAQ.find().sort({ createdAt: -1, updatedAt: -1 });

  if (!questions) {
    return next(new ErrorHandler("Questions not found", 404));
  }

  res.status(200).json({
    success: true,
    questions,
  });
});

// @desc        Get single store
// @route       GET /api/admin/store/:id
// @access      Private
const AdminGetQuestion = catchAsyncErrors(async (req, res, next) => {
  const question = await FAQ.findById(req.params.id);

  if (!question) {
    return next(new ErrorHandler("Questions not found", 404));
  }

  res.status(200).json({ success: true, question });
});

// @desc        Admin get all questions
// @route       GET /api/admin/questions
// @access      Private
const adminGetQuestions = catchAsyncErrors(async (req, res, next) => {
  const questions = await FAQ.find().sort({ createdAt: -1, updatedAt: -1 });

  if (!questions) {
    return next(new ErrorHandler("Questions not found", 404));
  }

  res.status(200).json({
    success: true,
    questions,
  });
});

// @desc        Admin Create a FAQ
// @route       POST /api/admin/store/new
// @access      Private

const createQuestion = catchAsyncErrors(async (req, res, next) => {
  const storeData = ({ category, question, answer } = req.body);

  const store = await FAQ.create(storeData);

  res.status(201).json({ success: true, store });
});

// @desc        Admin update a store
// @route       PUT /api/admin/store/:id
// @access      Private

const updateQuestion = catchAsyncErrors(async (req, res, next) => {
  let store = await FAQ.findById(req.params.id);
  if (!store) {
    return next(new ErrorHandler("Question not found", 404));
  }

  const storeData = ({ category, question, answer } = req.body);

  store = await FAQ.findByIdAndUpdate(req.params.id, storeData, {
    new: true,
  });

  res.status(200).json({ success: true, store });
});

// @desc        Admin Delete a store
// @route       DELETE /api/store/:id
// @access      Private
const deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  const store = await FAQ.findById(req.params.id);

  if (!store) {
    return next(new ErrorHandler("FAQ not found", 404));
  }

  await store.remove();
  res.status(200).json({ success: true, message: `Deleted Question` });
});

module.exports = {
  getQuestions,
  AdminGetQuestion,
  adminGetQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
