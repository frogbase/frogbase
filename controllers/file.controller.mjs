
const fileUpload = async (req, res) => {
    return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "File uploaded successfully!",
        data: req.files.map((file) => {
            return {
                name: file.filename.split("_dt_")[1],
                path: file.path,
            };
        }),
    });
};

export default { fileUpload };
