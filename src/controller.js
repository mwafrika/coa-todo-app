const showMessage = (req, res) => {
  res.status(200).send({
    message: "Message sent",
  });
};

export default showMessage;
