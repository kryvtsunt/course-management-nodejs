module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/course/:courseId/section/:sectionId/enrollment', enrollStudentInSection);
  app.post('/api/section/:sectionId/drop', dropStudentInSection);
  app.get('/api/course/:courseId/enrollment/check', checkSectionEnrollment);
  app.get('/api/student/section', findSectionsForStudent);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function(enrollments) {
        res.json(enrollments);
      });
  }

    function checkSectionEnrollment(req, res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var courseId = req.params.courseId
        console.log(courseId);
        console.log(studentId);
        enrollmentModel.checkSectionEnrollment(courseId, studentId)
            .then(function(response) {
                 if (response === null){
                   res.send({section: 0})
                 } else {
                     res.send(response);
                 }
            });
    }

  function enrollStudentInSection(req, res) {
      var courseId = req.params.courseId;
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId,
        course: courseId
    };
    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

    function dropStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId,
        };
        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .dropStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }
};