import {
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SingleNecklace = () => {
  const necklace = useLoaderData();
  const { jewelryName, size, color, price, description, photo, category } = necklace;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Add To Cart:
  const handleAddToCart = (item) => {
    console.log(item);
    if (user && user.email) {
      const addItem = {
        jewelryName,
        photo,
        size,
        color,
        description,
        category,
        email: user.email,
      };

      fetch("https://shine-on-server.vercel.app/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Necklace added on the Cart List",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login to added the Jewelry",
        icon: "Warning",
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img className="bg-white" src={photo} alt="" />
        <div className="bg-white p-4 flex flex-col gap-3">
          <h3 className="text-4xl font-medium text-gray-800">{jewelryName}</h3>
          <p className="text-2xl">Price: ${price}</p>
          <p className="text-2xl">Category: {category}</p>
          <p className="text-2xl">Size: {size}</p>
          <p className="text-2xl">Color: {color}</p>
          <h6 className="text-xl font-medium -mb-2">Details Necklace Info:</h6>
          <p className="text-xl">{description}</p>
          <button onClick={() => handleAddToCart(necklace)} className="text-white bg-blue-500 hover:bg-blue-600 text-lg font-medium w-full py-2 rounded-md mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleNecklace;
