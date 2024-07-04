const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: `${req.url} Not Found`
    })
}

export default notFoundHandler;
