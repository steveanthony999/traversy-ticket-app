const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Relates field to the user's object id
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'MacBook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Open', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
