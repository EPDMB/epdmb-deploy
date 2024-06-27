import { Controller, Post } from "@nestjs/common";

@Controller('admin')
export class AdminController {
    constructor () {}

    @Post()
    async createFair() {
        return "created fair"
    }
}