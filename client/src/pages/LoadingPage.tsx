import LoadingIcon from "/icon-loading.gif"

const LoadingPage = () => {
  return (
    <div
      style={{
        fontSize: "1.5em", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", minHeight: "100vh"
      }}
    >
      <p style={{ marginBottom: "10px" }}>Loading, please wait...</p>
      <img src={LoadingIcon} alt="Loading..." style={{ width: "200px" }} />
    </div >
  );
};

export default LoadingPage;