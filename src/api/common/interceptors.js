function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      if (localStorage.token != null || localStorage.token != undefined) {
        config.headers.Authorization = localStorage.token;
        config.headers.Refresh = localStorage.refreshToken;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      if (
        response.Authorization != null ||
        response.Authorization != undefined
      ) {
        localStorage.token = response.Authorization;
        localStorage.refreshToken = response.Refresh;
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}

export {setInterceptors};
