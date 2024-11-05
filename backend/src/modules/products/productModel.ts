import { z } from "zod";

export type TypePayloadProduct = {
  product_name: string;
  price: number;
  category_id: string; // เพิ่มฟิลด์ category_id สำหรับการสร้างผลิตภัณฑ์
};

// สร้าง Schema สำหรับการสร้างผลิตภัณฑ์
export const CreateProductSchema = z.object({
  body: z.object({
      product_name: z.string().max(50),
      price: z.number().positive(), // ตรวจสอบว่าเป็นจำนวนบวก
      category_id: z.string().uuid(), // ตรวจสอบว่าเป็น UUID
  })
});

// สร้าง Schema สำหรับการอัปเดตผลิตภัณฑ์
export const UpdateProductSchema = z.object({
  body: z.object({
      id: z.string().uuid(),
      product_name: z.string().max(50),
      price: z.number().positive(),
      category_id: z.string().uuid(),
  })
});

// สร้าง Schema สำหรับการดึงผลิตภัณฑ์
export const GetProductSchema = z.object({
  body: z.object({
      id: z.string().uuid(),
  })
});

// สร้าง Schema สำหรับการดึงผลิตภัณฑ์ด้วยพารามิเตอร์
export const GetParamProductSchema = z.object({
  params: z.object({
      id: z.string().uuid(), // ตรวจสอบว่า id เป็น UUID โดยตรง
  })
});