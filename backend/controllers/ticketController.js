const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get User Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc    Get User Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id); // Gets ticket from url

  if (!ticket) {
    res.status(404);

    throw new Error('Ticket nor found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

// @desc    Create New Tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.statusMessage(400);

    throw new Error('Please add a product and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'New',
  });

  res.status(201).json(ticket);
});

// @desc    Delete Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id); // Gets ticket from url

  if (!ticket) {
    res.status(404);

    throw new Error('Ticket nor found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc    Update Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);

    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id); // Gets ticket from url

  if (!ticket) {
    res.status(404);

    throw new Error('Ticket nor found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);

    throw new Error('Not Authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
