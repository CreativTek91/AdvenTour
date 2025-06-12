import { useParams} from "react-router-dom";
import Success from "../../components/success/Success";

function ActivationPage() {
  const { message } = useParams();

  return (
    <div className="text-white mt-10">
      <h1>Activation</h1>
      {message && <Success success={message} />}
    </div>
  );
}

export default ActivationPage;
