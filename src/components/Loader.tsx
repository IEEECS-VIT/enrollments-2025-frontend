import { Hourglass } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader-container">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#F8B95A", "#F87D10"]}
      />
    </div>
  );
}
