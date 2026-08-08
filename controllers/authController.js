const testController = (req,res) => {
    res.status(200).json({
        "success" : true,
        "message" : "testRoute created succesfully"
    })
}

export {testController};