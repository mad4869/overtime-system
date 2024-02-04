import overtimeMap from "./overtimeMap"
import { type Profile, type UserItemRecapSimple } from "@/types/customs"

export const setRecapContent = (
    period: string,
    recapYear: string,
    userItemsRecap: UserItemRecapSimple,
    avp: Profile,
    vp: Profile,
    avpSignature: string,
    vpSignature: string
) => {
    return `
    <div class="root">
        <header>
            <img src='https://overtimesystem.vercel.app/logo_yum.png' alt='Logo YUM' width="104.7" height="108" />
            <div>
                <h1>PT YEPEKA USAHA MANDIRI</h1>
                <h2>SURAT PERINTAH LEMBUR ${recapYear}</h2>
                <h3>
                    PERIODE&nbsp;
                    ${period}
                </h3>
            </div>
        </header>
        <main>
            <div class='profile'>
                <p class='label'>Nama</p>
                <p>:</p>
                <p>${userItemsRecap.userItems[0].user.name}</p>
            </div>
            <div class='profile'>
                <p class='label'>NPK</p>
                <p>:</p>
                <p>${userItemsRecap.userItems[0].user.npk}</p>
            </div>
            <div class='profile'>
                <p class='label'>Unit Kerja</p>
                <p>:</p>
                <p>${userItemsRecap.userItems[0].user.unit}</p>
            </div>
        </main>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th rowspan='3'>No.</th>
                        <th colspan='3' row-span='1'>Waktu Kerja</th>
                        <th rowspan='3'>Jumlah Lembur</th>
                        <th rowspan='3'>Tugas yang Dikerjakan</th>
                        <th rowspan='3'>Paraf</th>
                    </tr>
                    <tr>
                        <th rowspan='2'>Hari/Tanggal</th>
                        <th colspan='2'>Jam</th>
                    </tr>
                    <tr>
                        <th>Mulai</th>
                        <th>Selesai</th>
                    </tr>
                </thead>
                <tbody>
                    ${userItemsRecap.userItems.map((userItem, index) => {
                        const startDate = new Date(userItem.startTime)
                        const finishedDate = new Date(userItem.finishedTime)
                        const userItemDuration = (finishedDate.getTime()) - (startDate.getTime())
                        const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                        return (
                            `<tr>
                                <td>${index + 1}</td>
                                <td>
                                    ${startDate.toLocaleDateString('id-ID', { weekday: 'long' })}, ${startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </td>
                                <td>
                                    ${startDate.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td>
                                    ${finishedDate.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td>${overtimeMap.get(userItemDurationHour)}</td>
                                <td>${userItem.item}</td>
                                <td></td>
                            </tr>`
                        )
                    })}
                </tbody>
            </table>
        </div>
        <footer>
            <div class='signature'>
                <p>Menyetujui</p>
                ${vpSignature ? `<img src=${vpSignature} alt="Tanda tangan VP" width="80" height="80" />` : ''}
                <div class='signer'>
                    <p class='signer-name'>${vp.name}</p>
                    <p>${vp.position} ${vp.unit}</p>
                </div>
            </div>
            <div class='signature'>
                <p>Diperintah</p>
                ${avpSignature ? `<img src=${avpSignature} alt="Tanda tangan AVP" width="80" height="80" />` : ''}
                <div class='signer'>
                    <p class='signer-name'>${avp.name}</p>
                    <p>${avp.position} ${avp.unit}</p>
                </div>
            </div>
            <div class='signature'>
                <p>Yang Menerima Tugas</p>
                <div class='signer'>
                    <p class='signer-name'>${userItemsRecap.userItems[0].user.name}</p>
                    <p>NPK ${userItemsRecap.userItems[0].user.npk}</p>
                </div>
            </div>
        </footer>
    </div>
    `
}

export const contentStyle = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #fff;
        margin: 20px;
    }
    div.root {
        position: relative;
        height: 100%;
    }
    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 64px;
        padding-right: 64px;
        padding-top: 32px;
    }
    main {
        padding-top: 64px;
        padding-left: 64px;
        padding-right: 64px;
    }
    div.profile {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
    }
    p.label {
        width: 80px;
    }
    div.table {
        padding-left: 64px;
        padding-right: 64px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: auto;
        margin-top: 32px;
        font-size: 12px;
        text-align: center;
        border-width: 1px;
        border-color: #000;
    }
    th, td {
        border: 1px solid #000;
    }
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 12px;
        padding-left: 64px;
        padding-right: 64px;
        padding-top: 32px;
        padding-bottom: 32px;
    }
    div.signature {
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center
    }
    div.signer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p.signer-name {
        width: 100%;
        text-align: center;
        border-bottom-width: 1px;
        border-top-width: 0px;
        border-right-width: 0px;
        border-left-width: 0px;
        border-color: #000;
        border-style: solid
    }
`