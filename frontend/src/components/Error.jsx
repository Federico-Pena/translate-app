import { useContextVoice } from "../hooks/useContextVoice";
import "../app.css";
const Error = () => {
  const { error, translateError } = useContextVoice();

  return (
    (translateError || error) && (
      <p className="error">{translateError || error}</p>
    )
  );
};
export default Error;
