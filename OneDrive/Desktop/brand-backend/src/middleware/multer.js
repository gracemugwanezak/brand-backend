import multer from "multer";
import path from "path";
import fs from "fs";
const imageStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const dir = "./uploads/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callBack(null, dir);
  },
  filename: function (req, file, callback) {
    callback(
      null,
      `_${Date.now()}_${file.filename}_${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage: imageStorage });
