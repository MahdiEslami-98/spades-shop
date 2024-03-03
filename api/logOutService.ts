const logoutService = async () => {
  try {
    const response = await fetch(process.env.BASE_URL + "/auth/logout", {});
  } catch (error) {}
};

export default logoutService;
