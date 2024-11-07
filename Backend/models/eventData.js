const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Workshop', 'Conference', 'Concert', 'Sports', 'Exhibition', 'Other']
  },
  format: {
    type: String,
    required: true,
    enum: ['Online', 'Offline']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
      type: String,
      required: true
    },
  
  location: { 
    venue: {
      type: String,
      required: function() { return this.format === 'Offline'; }
    },
    city: {
      type: String,
      required: function() { return this.format === 'Offline'; }
    },
    address: {
      type: String,
      required: function() { return this.format === 'Offline'; }
    },
    virtualLink: {
      type: String,
      required: function() { return this.format === 'Online'; }
    }
  },
  organizer: {
    name: {
      type: String,
    },
    contact: {
      email: {
        type: String,
        match: /.+\@.+\..+/
      },
      phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
      }
    }
  },
  ticketing: {
    price: {
      type: Number,
      required: true,
      default: 0
    },
    capacity: {
      type: Number,
      min: 0 // Optional, no need to require
    }
  },
  media: {
    images: [
      {
        type: String
      }
    ]
  },
  terms: {
    cancellationPolicy: {
      type: String,
      default: "No refunds available."
    },
    safetyGuidelines: {
      type: String
    }
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedBy: {
    type: String,
    enum: ['admin', 'organizer'],
    // required: true
  },
  approvalHistory: {
    approvedAt: Date,
    rejectedAt: Date,
    rejectionReason: String // Optionally, store reason if rejected
  }
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
