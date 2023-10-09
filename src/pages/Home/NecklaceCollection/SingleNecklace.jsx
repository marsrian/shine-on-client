import { useLoaderData } from "react-router-dom";

const SingleNecklace = () => {
  const necklace = useLoaderData();
  const { jewelryName, size, color, price, description, photo, category } =
    necklace;
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
          <h6 className="text-xl font-medium -mb-2">Details Ring Info:</h6>
          <p className="text-xl">{description}</p>
          <button className="text-white bg-blue-500 hover:bg-blue-600 text-lg font-medium w-full py-2 rounded-md mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleNecklace;
