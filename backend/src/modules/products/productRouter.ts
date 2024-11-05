import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { productService } from "@modules/products/productService";
import { CreateProductSchema, UpdateProductSchema, GetProductSchema, GetParamProductSchema } from "@modules/products/productModel";
import authorizeAdmin from "@common/middleware/authorizeAdmin";
import authenticateToken from "@common/middleware/authenticateToken";

export const productRouter = (() => {
    const router = express.Router();

    // ดึงข้อมูลผลิตภัณฑ์ทั้งหมด
    router.get("/get",authenticateToken, async (req: Request, res: Response) => {
        const serviceResponse = await productService.findAll(); // คุณต้องเพิ่มฟังก์ชัน findAll ใน productService
        handleServiceResponse(serviceResponse, res);
    });

    // สร้างผลิตภัณฑ์ใหม่
    router.post("/create",
        authenticateToken, 
        authorizeAdmin,
        validateRequest(CreateProductSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await productService.create(payload);
        handleServiceResponse(serviceResponse, res);
    });

    // อัปเดตผลิตภัณฑ์
    router.patch("/update", validateRequest(UpdateProductSchema), async (req: Request, res: Response) => {
        const { id } = req.body;
        const payload = req.body;
        const serviceResponse = await productService.update(id, payload); // คุณต้องเพิ่มฟังก์ชัน update ใน productService
        handleServiceResponse(serviceResponse, res);
    });

    // ลบผลิตภัณฑ์
    router.delete("/delete", validateRequest(GetProductSchema), async (req: Request, res: Response) => {
        const { id } = req.body;
        const serviceResponse = await productService.delete(id); // คุณต้องเพิ่มฟังก์ชัน delete ใน productService
        handleServiceResponse(serviceResponse, res);
    });

    // ดึงข้อมูลผลิตภัณฑ์โดยใช้ ID
    router.get("/get/:id", validateRequest(GetParamProductSchema), async (req: Request, res: Response) => {
        const { id } = req.params;
        const serviceResponse = await productService.findById(id); // คุณต้องเพิ่มฟังก์ชัน findById ใน productService
        handleServiceResponse(serviceResponse, res);
    });

    return router;
})();
