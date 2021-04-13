const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// RESET PASSWORD \\
// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  // Find the user by the resettoken and only if expiration is greater than right now
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse('Invalid token'), 400);
  }

  // Set new password
  user.password = req.body.password;
  // Set resetPasswordToken and resetPasswordExpire to undefined
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  // Save the user
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie token
// @route   Get /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 + 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});
