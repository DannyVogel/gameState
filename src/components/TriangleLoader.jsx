import { Triangle } from "react-loader-spinner";

const TriangleLoader = () => {
  return (
    <Triangle
      height="80"
      width="80"
      color="#FFFFFF"
      ariaLabel="triangle-loading"
      wrapperStyle={{ marginTop: "50px" }}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default TriangleLoader;
