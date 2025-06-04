const useSubDomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  if (hostname.includes("localhost")) {
    return parts[0];
  } else {
    return parts.length > 2 ? parts[0] : null;
  }
};

export default useSubDomain;
