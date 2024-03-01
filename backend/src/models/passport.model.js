const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema({
    parentMember_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    country: {
        type: String,
        required: true
    },
    passportNo: {
        type: String,
        required: true,
        unique: true
    },
    dateOfIssue: {
        type: Date,
        required: true
    },
    dateOfExpiry: {
        type: Date,
        required: true
    },
    placeOfIssue: {
        type: String,
        required: true
    },
    fileNo: {
        type: String,
        required: true,
        unique: true
    },
    previousPassportNo: {
        type: String,
        required: true
    },
    previousPassportDateOfIssue: {
        type: Date,
        required: false
    },
    previousPassportPlaceOfIssue: {
        type: String,
        required: false
    },
    documents: {
        coverPage: {
            type: String,
            required: true
        },
        firstPage: {
            type: String,
            required: true
        },
        lastPage: {
            type: String,
            required: true
        },
        pdf: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Passport = mongoose.model('Passport', passportSchema);

module.exports = Passport;
