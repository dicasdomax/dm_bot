import express, { Request, Response } from "express"
import Sender from "./sender";

const sender = new Sender()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected
    })
})

app.post('/sendText', async (req: Request, res: Response) => {
    const { number, message } = req.body
   
    try {
        await sender.sendText(number, message)

        return res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: "error" })
    }
})

app.post('/sendFile', async (req: Request, res: Response) => {
    const { number, path, file_name, caption } = req.body
   
    try {
        await sender.sendFile(number, path, file_name, caption) 

        return res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: "error" })
    }
})

app.post('/sendImage', async (req: Request, res: Response) => {
    const { number, path, image_name, caption } = req.body
   
    try {
        await sender.sendImage(number, path, image_name, caption) 

        return res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: "error" })
    }
})

app.post('/sendLinkPreview', async (req: Request, res: Response) => {
    const { number, url, title } = req.body
   
    try {
        await sender.sendLinkPreview(number, url, title)

        return res.status(200).json()
    }catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: "error" })
    }
})

app.listen(5000, () => {
    console.log("Servidor Rodando na porta: 5000")
})