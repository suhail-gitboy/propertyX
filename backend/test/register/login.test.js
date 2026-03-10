import { it, describe, expect, toBeDefined, afterAll, beforeAll } from "vitest"
import request from "supertest"
import app from "../../Server"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
let mongoServer

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create()
//     const uri = mongoServer.getUri()
//     await mongoose.connect(uri)
// })
// afterAll(async () => {
//     await mongoose.disconnect()
//     await mongoServer.stop()
// })



describe("test the register function", () => {

    it("should register a user", async () => {


        const endpoint = "/auth/register"
        const paayload = {
            name: "hari",
            email: "hari@gmail.com",
            password: "123456"
        }
        const res = await request(app).post(endpoint).send(paayload)
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            name: "hari",
            email: "hari@gmail.com"
        })
        expect(res.body._id).toBeDefined()
    })

    it("it returns 400 email already exists", async () => {
        const endpoint = "/auth/register"
        const payload = {
            name: "hari",
            email: "hari@gmail.com",
            password: "123456"

        }
        const res = await request(app).post(endpoint).send(payload)
        expect(res.status).toBe(400)
        expect(res.body).toBe("user already exist")
    })

})


