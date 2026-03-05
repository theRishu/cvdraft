import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title")?.toString() || "Resume";
        const css = formData.get("css")?.toString() || "";
        const htmlContent = formData.get("html")?.toString() || "";
        const layoutStr = formData.get("layout")?.toString() || "{}";

        const layout = JSON.parse(layoutStr);
        const topMargin = layout.topMargin ?? 15;
        const bottomMargin = layout.bottomMargin ?? 15;

        // Construct the full HTML document
        const fullHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <!-- Google Fonts for consistency -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Merriweather:wght@400;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
                    <style>
                        /* Base resets for PDF */
                        body {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        /* Inject the extracted styles from the page */
                        ${css}
                        
                        /* Ensure the paper-page correctly spans the print area */
                        .paper-page {
                            width: 100% !important;
                            height: auto !important;
                            min-height: auto !important;
                            box-shadow: none !important;
                            margin: 0 !important;
                            background: white !important;
                            /* Reset Tailwind DaisyUI overrides if necessary */
                            color: black; 
                        }
                    </style>
                </head>
                <body>
                    <div class="paper-page" style="width: 210mm; background: white; margin: 0 auto; box-sizing: border-box;">
                        ${htmlContent}
                    </div>
                </body>
            </html>
        `;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set the content and wait for network/fonts to finish loading
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: `${topMargin}mm`,
                bottom: `${bottomMargin}mm`,
                left: '0mm',
                right: '0mm'
            }
        });

        await browser.close();

        return new Response(Buffer.from(pdfBuffer), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${title}.pdf"`,
            },
        });

    } catch (err: any) {
        console.error("Puppeteer PDF Error:", err);
        return new NextResponse("Failed to generate PDF", { status: 500 });
    }
}
