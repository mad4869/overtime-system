import QRCode from 'qrcode'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { setRecapContent, contentStyle } from '@/constants/recapContent'
import { generateSignatureToken } from '@/actions/signature'
import { type Profile, type UserItemRecapSimple } from '@/types/customs'

async function generateRecapPDF(
    period: string,
    recapYear: string,
    userItemRecaps: UserItemRecapSimple[],
    avp: Profile,
    vp: Profile
) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless
    })

    const page = await browser.newPage()

    const pdfContents = await Promise.all(userItemRecaps.map(async (recap) => {
        const avpToken = generateSignatureToken(avp)
        const vpToken = generateSignatureToken(vp)
        const avpQRCodeData: string = await new Promise((resolve, reject) => {
            if (recap.isApprovedByAVP) {
                QRCode.toDataURL(`https://overtimesystem.vercel.app/recap/${recap.id}/verification?token=${avpToken}`, (err, url) => {
                    if (err) reject(err)
                    resolve(url)
                })
            } else {
                resolve('')
            }
        })
        const vpQRCodeData: string = await new Promise((resolve, reject) => {
            if (recap.isApprovedByVP) {
                QRCode.toDataURL(`https://overtimesystem.vercel.app/recap/${recap.id}/verification?token=${vpToken}`, (err, url) => {
                    if (err) reject(err)
                    resolve(url)
                })
            } else {
                resolve('')
            }
        })
        const recapContent = setRecapContent(period, recapYear, recap, avp, vp, avpQRCodeData, vpQRCodeData)
        return recapContent
    }))

    const combinedPDFContent = pdfContents.join('<div style="break-after: page;"></div>');

    await page.setContent(combinedPDFContent);
    await page.addStyleTag({ content: contentStyle });

    const pdf = await page.pdf({ format: 'A4' });

    await browser.close()

    return pdf
}

export async function POST(request: Request) {
    const res = await request.json()
    const pdfs = await generateRecapPDF(res.period, res.recapYear, res.userItemRecaps, res.avp, res.vp)
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', 'inline; filename=recap.pdf')

    return new Response(pdfs, { headers })
}