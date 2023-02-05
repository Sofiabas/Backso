import multer from "multer";
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (request, file, callback) => {
    const temp_file_arr = file.originalname.split(".");

    const temp_file_name = temp_file_arr[0];

    const temp_file_extension = temp_file_arr[1];

    callback(
      null,
      temp_file_name + "-" + Date.now() + "." + temp_file_extension
    );
  },
});
const upload = multer({ storage: storage });

export default upload;
