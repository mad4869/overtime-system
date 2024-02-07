'use client'

import Image from 'next/image';
import InfoMessage from '@/components/ui/InfoMessage';
import useQRCode from '@/hooks/useQRCode';
import useSignatureToken from '@/hooks/useSignatureToken';
import overtimeMap from '@/constants/overtimeMap';
import setRecapPeriod from '@/constants/recapPeriod';
import { type Profile, type UserItemRecapSimple } from '@/types/customs';

type RecapLetterProps = {
    userItemsRecap: UserItemRecapSimple
    avp: Profile
    vp: Profile
}

const RecapLetter = ({ userItemsRecap, avp, vp }: RecapLetterProps) => {
    const isApprovedByAVP = userItemsRecap.isApprovedByAVP
    const isApprovedByVP = userItemsRecap.isApprovedByVP

    const avpToken = useSignatureToken(avp)
    const vpToken = useSignatureToken(vp)

    const avpQRCodeData = useQRCode(`https://overtimesystem.vercel.app/recap/${userItemsRecap.id}/verification`, avpToken, isApprovedByAVP)
    const vpQRCodeData = useQRCode(`https://overtimesystem.vercel.app/recap/${userItemsRecap.id}/verification`, vpToken, isApprovedByVP)

    const recapPeriod = setRecapPeriod()
    const isRecapSameYear = recapPeriod.startPeriod.toLocaleDateString('id-ID', { year: 'numeric' }) === recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { year: 'numeric' })
    const recapStartYear = !isRecapSameYear ? `${recapPeriod.startPeriod.toLocaleDateString('id-ID', { year: 'numeric' })}-` : ''
    const recapFinishedYear = recapPeriod.finishedPeriod.toLocaleDateString('id-ID', { year: 'numeric' })
    const recapYear = recapStartYear + recapFinishedYear

    return (
        <>
            <div className='block lg:hidden'>
                <InfoMessage useIcon>Lihat informasi ini melalui desktop</InfoMessage>
            </div>
            <div className='hidden lg:block shadow-lg shadow-primary/50 px-16 py-8 h-[1280px] relative'>
                <div className='flex items-center justify-between'>
                    <Image src='/logo_yum.png' alt='Logo YUM' width={1047 / 10} height={1080 / 10} />
                    <div className='font-bold'>
                        <h1 className='text-4xl'>PT YEPEKA USAHA MANDIRI</h1>
                        <h2 className='text-2xl'>SURAT PERINTAH LEMBUR {recapYear}</h2>
                        <h3 className='text-xl'>
                            PERIODE&nbsp;
                            {recapPeriod.startPeriod.toLocaleDateString(
                                'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                            &nbsp;-&nbsp;
                            {recapPeriod.finishedPeriod.toLocaleDateString(
                                'id-ID', { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                        </h3>
                    </div>
                </div>
                <div className='mt-8'>
                    <div className='flex items-center gap-1'>
                        <p className='w-20'>Nama</p>
                        <p>:</p>
                        <p>{userItemsRecap.userItems[0].user.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <p className='w-20'>NPK</p>
                        <p>:</p>
                        <p>{userItemsRecap.userItems[0].user.npk}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <p className='w-20'>Unit Kerja</p>
                        <p>:</p>
                        <p>{userItemsRecap.userItems[0].user.unit}</p>
                    </div>
                </div>
                <table className='w-full text-xs text-center border-collapse table-auto mt-8 border border-primary'>
                    <thead>
                        <tr>
                            <th rowSpan={3} className='border border-primary'>No.</th>
                            <th colSpan={3} rowSpan={1} className='border border-primary'>Waktu Kerja</th>
                            <th rowSpan={3} className='border border-primary'>Jumlah Lembur</th>
                            <th rowSpan={3} className='border border-primary'>Tugas yang Dikerjakan</th>
                            <th rowSpan={3} className='border border-primary'>Paraf</th>
                        </tr>
                        <tr>
                            <th rowSpan={2} className='border border-primary'>Hari/Tanggal</th>
                            <th colSpan={2}>Jam</th>
                        </tr>
                        <tr>
                            <th className='border border-primary'>Mulai</th>
                            <th className='border border-primary'>Selesai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userItemsRecap.userItems.map((userItem, index) => {
                            const userItemDuration = (userItem.finishedTime.getTime()) - (userItem.startTime.getTime())
                            const userItemDurationHour = Math.ceil(userItemDuration / 3_600_000)

                            return (
                                <tr key={userItem.id}>
                                    <td className='border border-primary'>{index + 1}</td>
                                    <td className='border border-primary'>{userItem.startTime.toLocaleDateString('id-ID')}</td>
                                    <td className='border border-primary'>
                                        {userItem.startTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className='border border-primary'>
                                        {userItem.finishedTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className='border border-primary'>{overtimeMap.get(userItemDurationHour)}</td>
                                    <td className='border border-primary'>{userItem.item}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='text-xs flex justify-between items-center absolute bottom-0 left-0 right-0 px-16 py-8'>
                    <div className='h-40 flex flex-col justify-between items-center'>
                        <p>Menyetujui</p>
                        {vpQRCodeData && <Image src={vpQRCodeData} alt='Tanda tangan VP' width={80} height={80} />}
                        <div className='flex flex-col items-center'>
                            <p className='w-full text-center border-b border-primary'>{vp.name}</p>
                            <p>{vp.position} {vp.unit}</p>
                        </div>
                    </div>
                    <div className='h-40 flex flex-col justify-between items-center'>
                        <p>Diperintah</p>
                        {avpQRCodeData && <Image src={avpQRCodeData} alt='Tanda tangan AVP' width={80} height={80} />}
                        <div className='flex flex-col items-center'>
                            <p className='w-full text-center border-b border-primary'>{avp.name}</p>
                            <p>{avp.position} {avp.unit}</p>
                        </div>
                    </div>
                    <div className='h-40 flex flex-col justify-between items-center'>
                        <p>Yang Menerima Tugas</p>
                        <div className='flex flex-col items-center'>
                            <p className='w-full text-center border-b border-primary'>
                                {userItemsRecap.userItems[0].user.name}
                            </p>
                            <p>NPK {userItemsRecap.userItems[0].user.npk}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecapLetter