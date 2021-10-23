import React from "react";
import PropTypes from "prop-types";
import StudySessionTemplate from "./StudySessionTemplate";

const EditStudySession = ({ setOpen, open, studySession }) => {
  return (
    <StudySessionTemplate
      setOpen={setOpen}
      open={open}
      studySession={studySession}
    />
  );
};

EditStudySession.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  studySession: PropTypes.object,
};

export default EditStudySession;
