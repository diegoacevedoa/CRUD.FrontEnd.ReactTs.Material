import "./Loading.scss";

interface ILoading {
  show: boolean;
}

const Loading = ({ show = false }: ILoading) => {
  return (
    <>
      {show && (
        <div className="mb-loading-container">
          <div className="mb-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
