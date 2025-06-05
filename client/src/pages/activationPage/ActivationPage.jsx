import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Success from "../../components/success/Success";
import Error from "../../components/errors/Error";
import useAuthStore from "../../store/useAuthStore";
function ActivationPage() {
  const { message} = useParams();
  const navigate = useNavigate();
 

 

  return (
    <div className="text-white mt-10">
      <h1>Activation</h1>
      {message && <Success success={message} />}
      {/* {error && <Error error={error} />} */}
    </div>
  );
}

export default ActivationPage;
