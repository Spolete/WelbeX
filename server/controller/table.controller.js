

export class userController {
    async getProducts(req, res) {
        res.json(res.results)
    }
}

export default new userController()