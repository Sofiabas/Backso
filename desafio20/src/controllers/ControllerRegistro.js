const registroGet = async (req, res) => {
  res.status(200).render("registro", {
    user: "",
  });
};

const registroPost = async (req, res) => {
  res.redirect("/login");
};

const registroFailGet = async (req, res) => {
  res.status(200).render("failregistro");
};

export { registroGet, registroPost, registroFailGet };
