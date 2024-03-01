const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberType: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  givenName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  birthPlace: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  fatherName: {
    surname: {
      type: String,
      required: true
    },
    givenName: {
      type: String,
      required: true
    }
  },
  motherName: {
    surname: {
      type: String,
      required: true
    },
    givenName: {
      type: String,
      required: true
    }
  },
  spouseName: {
    surname: {
      type: String,
    },
    givenName: {
      type: String,
    }
  },
  education: {
    nameOfInstitute: {
      type: String,
    },
    course: {
      type: String,
    },
    yearFrom: {
      type: Number,
    },
    yearTo: {
      type: Number,
    }
  },
  joiningDate: {
    type: Date,
    required: true
  },
  address: {
    line1: {
      type: String,
    },
    line2: {
      type: String
    },
    line3: {
      type: String
    }
  },
  documents: {
    identity: {
      type: String,
    },
    memberCertificate: {
      type: String,
    },
    others: {
      type: String
    }
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
