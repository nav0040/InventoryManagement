const Sale = require("../models/Sale")
const ExcelJS = require('exceljs');
const PdfPrinter = require('pdfmake');
const nodemailer = require('nodemailer');
//Export sales data to Excel
exports.exportSalesTOExcel = async (req, res) => {
    try {
        const sales = await Sale.find().populate('item customer');

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sales Report');

        worksheet.columns = [
            { header: 'Item Name', key: 'item', width: 20 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Customer', key: 'customer', width: 20 },
            { header: 'Sale Type', key: 'saleType', width: 10 },
            { header: 'Total Price', key: 'totalPrice', width: 15 },
            { header: 'Date', key: 'date', width: 20 }
        ];


        sales.forEach(sale => {
            worksheet.addRow({
                item: sale.item.name,
                quantity: sale.quantity,
                customer: sale.customer ? sale.customer.name : 'Cash',
                saleType: sale.saleType,
                totalPrice: sale.totalPrice,
                date: sale.date
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=sales_report.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to export data' });
    }
}


// Export to PDF
exports.exportSalesToPdf = async (req, res) => {
    try {
        const sales = await Sale.find().populate('item customer');
        const fonts = {
            Roboto: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new PdfPrinter(fonts);

        const docDefinition = {
            content: [
                { text: 'Sales Report', style: 'header' },
                ...sales.map(sale => {
                    return {
                        text: `Item: ${sale.item.name}, Quantity: ${sale.quantity}, Customer: ${sale.customer ? sale.customer.name : 'Cash'}, Total Price: ${sale.totalPrice}`,
                        style: 'subheader'
                    };
                })
            ],
            styles: {
                header: { fontSize: 18, bold: true },
                subheader: { fontSize: 14, margin: [0, 10, 0, 5] }
            }
        };


        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=sales_report.pdf');
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to export PDF' });
    }
}


exports.emailSalesReport = async (req, res) => {
    try {
        const sales = await Sale.find().populate('item customer');


        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sales Report');
        worksheet.columns = [
            { header: 'Item', key: 'item', width: 20 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Customer', key: 'customer', width: 20 },
            { header: 'Sale Type', key: 'saleType', width: 10 },
            { header: 'Total Price', key: 'totalPrice', width: 15 },
            { header: 'Date', key: 'date', width: 20 }
        ];

        sales.forEach(sale => {
            worksheet.addRow({
                item: sale.item.name,
                quantity: sale.quantity,
                customer: sale.customer ? sale.customer.name : 'Cash',
                saleType: sale.saleType,
                totalPrice: sale.totalPrice,
                date: sale.date
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAIL_ID,
            to: req.body.email,
            subject: 'Sales Report',
            text: 'Please find attached the sales report.',
            attachments: [{ filename: 'sales_report.xlsx', content: buffer }]
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {

        res.status(500).json({ error: 'Failed to send email' });
    }
}