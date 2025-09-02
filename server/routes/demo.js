export const handleDemo = (req, res) => {
  const response = {
    message: "Hello from the Study Abroad CRM API! 🎓",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  };
  res.json(response);
};
