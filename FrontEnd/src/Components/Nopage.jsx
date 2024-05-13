import NoPageGIF from "../assets/404_noPage.gif";
const Nopage = () => {
  return (
    <div>
      <img
        src={NoPageGIF} // Update with the actual path to your GIF
        alt="No Page Found"
        style={{ width: "100%", height: "97vh" }}
      />
    </div>
  );
};

export default Nopage;
