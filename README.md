Postman Collection : https://cloudy-capsule-625660.postman.co/workspace/My-Workspace~f3f0243c-5fd7-450a-8190-20d418e53095/collection/14927268-67472f32-7a43-459f-9272-9fb7c5729cd9?action=share&creator=14927268

adminlte ดาวน์โหลดได้จาก (https://github.com/ColorlibHQ/AdminLTE/archive/refs/tags/v3.2.0.zip) หรือ (https://drive.google.com/file/d/1JAis1y4cVzbAn_XDyI2XC_Ix7f5z3RgK/view?usp=sharing)

1. ติดตั้ง Theme adminlte (โหลดมาแล้วแตกไฟล์เปลี่ยนชื่อ folder เป็น adminlte [510831-wongnok-recipes/adminlte])
2. ติดตั้ง nodejs
3. cd api -> npm install
4. run api (cd api -> npm run dev) api จะ running ที่ localhost:3000
5. สร้าง database ชื่อ 510831_wongnok_recipes โดย character set เป็น utf8 และ collation เป็น utf8_general_ci ***หรือ*** โหลด database ที่ (https://drive.google.com/file/d/1JNTOcCGwsWTrpzQGOgGigVcIadLJmntZ/view?usp=sharing) แล้วนำไป import เข้า Database server
6. ทำ migration ให้กับ database โดยไปที่ folder api จากนั้นใช้คำสั่ง (npx sequelize-cli db:migrate) ***หากข้อ 5 import database ไม่ต้องทำ migration***
7. เข้าใช้งานเว็บโดยเข้าไปที่ 510831-wongnok-recipes/index.html ด้วย web browser และทดสอบเข้าใช้งาน

หรือ โหลดโปรเจคตัวเต็มได้จาก (https://drive.google.com/file/d/1JFSR5qihzAO8SOMUC64CwZmc1DSDWhlR/view?usp=sharing) แล้วแตกไฟล์ จากนั้นทำขั้นตอน 2-7