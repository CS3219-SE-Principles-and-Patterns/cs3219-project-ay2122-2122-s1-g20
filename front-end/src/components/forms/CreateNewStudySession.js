import React from "react";
import PropTypes from "prop-types";
import StudySessionTemplate from "./StudySessionTemplate";

const CreateNewStudySession = ({ setOpen, open }) => {
  return <StudySessionTemplate setOpen={setOpen} open={open} />;
};

CreateNewStudySession.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default CreateNewStudySession;
