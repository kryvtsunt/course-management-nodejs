var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function dropStudentInSection(enrollment) {
    return enrollmentModel.remove(enrollment);
}

function checkSectionEnrollment(courseId, studentId) {
    return enrollmentModel.findOne({course: courseId, student: studentId});
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
    checkSectionEnrollment: checkSectionEnrollment,
    dropStudentInSection: dropStudentInSection
};