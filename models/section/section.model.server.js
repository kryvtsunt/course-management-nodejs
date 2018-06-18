var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function deleteSection(sectionId) {
    return sectionModel.remove({_id: sectionId});
}

function updateSection(sectionId, section) {
    return sectionModel.update({_id: sectionId},{$set:{name: section.name, seats: section.seats}})
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}


function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    deleteSection: deleteSection,
    updateSection: updateSection

};