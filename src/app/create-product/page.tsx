import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormProduct from "../components/FormProduct";

export default function CreateProduct() {
  return (
    <div className="bg flex-1">
      <FormProduct />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
