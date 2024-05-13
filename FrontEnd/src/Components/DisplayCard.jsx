const DisplayCard = (props) => {
  return (
    <div className="container ml-24 px-2">
      <div className="relative shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center btn-style ">
        <div className="p-4">
          <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
            {props.title} Employees
          </h5>
          <h4 className="text-white text-3xl font-bold flex justify-center">
            {props.count}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
