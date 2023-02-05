const chatGet = async (req, res) => {
  res.status(200).render("chat", {
    user: req.session.user,
  });
};

export default chatGet;
