
const fileUpload = async (req, res) => {
    return res.status(201).json({
        success: true,
        message: "File uploaded successfully!",
        data: req.files.map((file) => {
            return {
                name: file.filename.split("_dt_")[1],
                path: file.path,
            };
        }),
    });
};

module.exports = { fileUpload };
