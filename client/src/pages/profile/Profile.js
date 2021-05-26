import React from "react";
import { useParams } from "react-router-dom";
import Appbar from "../../components/appBar/AppBar";

const Profile = () => {
  const { id } = useParams();
  return (
    <div>
      <Appbar />
    </div>
  );
};

export default Profile;
