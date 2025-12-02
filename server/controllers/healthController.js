export const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "Server is live 🚀"
  });
};
