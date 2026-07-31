import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = ({ success }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate(success.path);
    }, 1500); // 1 second delay

    return () => clearTimeout(timer);
  }, [success, navigate]);

  if (!success) return null;

  return (
    <div className="success">
      {success.message}
    </div>
  );
};

export default Success;

