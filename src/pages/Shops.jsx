import { RiseLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useSubDomain from "../hooks/useSubDomain";

const Shops = () => {
  const subDomain = useSubDomain();
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RiseLoader color="#0debd7" className="py-12" />
      </div>
    );
  }
  return (
    <div className="text-center mt-10 text-xl font-semibold">
      This is <span className="text-blue-600">{subDomain}</span> shop
    </div>
  );
};

export default Shops;
