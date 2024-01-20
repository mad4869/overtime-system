import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'

import overtimeMap from '@/constants/overtimeMap'
import { type UserItem } from '@/types/customs'

Font.register({
    family: 'Open Sans', src: 'http://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf', fontStyle: 'normal', fontWeight: 'normal'
})

const styles = StyleSheet.create({
    document: {
        fontFamily: 'Open Sans'
    },
    page: {
        flexDirection: 'column',
        backgroundColor: '#EEE',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: '0px 30px',
        fontSize: 16
    },
    profile: {
        padding: '0px 30px',
        margin: '10px 0',
        fontSize: 10
    },
    profileField: {
        display: 'flex',
        flexDirection: 'row'
    },
    profileFieldWidth: {
        width: 50
    },
    table: {
        margin: '0px 30px',
        fontSize: 8,
        border: 1
    },
    tableHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    no: {
        width: 20,
        borderRight: 1
    },
    dateTime: {
        width: 70,
        borderRight: 1,
    },
    workingTime: {
        width: 40,
        borderRight: 1
    },
    overtime: {
        width: 80,
        borderRight: 1
    },
    item: {
        flex: 1,
        borderRight: 1
    },
    sign: {
        width: 24
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 50,
        width: '100%',
        padding: '0px 30px',
        fontSize: 8,
    },
    footerField: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100
    },
    footerProfile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerProfileName: {
        borderBottom: 1
    }
})

type LetterProps = {
    userItems: UserItem[]
}

const Letter = ({ userItems }: LetterProps) => {
    return (
        <Document style={styles.document}>
            <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Image src="/logo_yum.png" style={{ width: 1047 / 10, height: 1080 / 10 }} />
                    <View>
                        <Text>PT. YEPEKA USAHA MANDIRI</Text>
                        <Text>SURAT PERINTAH LEMBUR 2023-2024</Text>
                        <Text>PERIODE 11 Desember 2023 - 10 Januari 2024</Text>
                    </View>
                </View>
                <View style={styles.profile}>
                    <View style={styles.profileField}>
                        <Text style={styles.profileFieldWidth}>Nama</Text>
                        <Text>: {userItems[0].user.name}</Text>
                    </View>
                    <View style={styles.profileField}>
                        <Text style={styles.profileFieldWidth}>NPK</Text>
                        <Text>: {userItems[0].user.npk}</Text>
                    </View>
                    <View style={styles.profileField}>
                        <Text style={styles.profileFieldWidth}>Unit Kerja</Text>
                        <Text>: {userItems[0].user.unit}</Text>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={{ ...styles.center, ...styles.no }}>
                            <Text>No.</Text>
                        </View>
                        <View style={{ ...styles.center }}>
                            <View style={{ ...styles.center, width: '100%', borderBottom: 1, borderRight: 1 }}>
                                <Text>Waktu Kerja</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ ...styles.center, ...styles.dateTime, height: '100%' }}>
                                    <Text>Hari/Tanggal</Text>
                                </View>
                                <View>
                                    <View style={{ ...styles.center, borderBottom: 1, borderRight: 1 }}>
                                        <Text>Jam</Text>
                                    </View>
                                    <View style={{ ...styles.center, display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ ...styles.center, ...styles.workingTime }}>
                                            <Text>Mulai</Text>
                                        </View>
                                        <View style={{ ...styles.center, ...styles.workingTime }}>
                                            <Text>Selesai</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.center, ...styles.overtime }}>
                            <Text>Jumlah Lembur</Text>
                        </View>
                        <View style={{ ...styles.center, ...styles.item }}>
                            <Text>Tugas yang Dikerjakan</Text>
                        </View>
                        <View style={{ ...styles.center, ...styles.sign }}>
                            <Text>Paraf</Text>
                        </View>
                    </View>
                    <View>
                        {userItems.map((userItem, index) => {
                            const userItemDuration = (userItem.finishedTime.getHours()) - (userItem.startTime.getHours())
                            return (
                                <View key={userItem.id} style={{ ...styles.tableHeader, borderTop: 1 }}>
                                    <View style={{ ...styles.center, ...styles.no }}>
                                        <Text>{index + 1}</Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.dateTime }}>
                                        <Text>{userItem.startTime.toDateString()}</Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.workingTime }}>
                                        <Text>
                                            {
                                                userItem.startTime.toLocaleTimeString(
                                                    [], { hour12: false, hour: '2-digit', minute: '2-digit' }
                                                )
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.workingTime }}>
                                        <Text>
                                            {
                                                userItem.finishedTime.toLocaleTimeString(
                                                    [], { hour12: false, hour: '2-digit', minute: '2-digit' }
                                                )
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.overtime }}>
                                        <Text>{overtimeMap.get(userItemDuration)} jam lembur</Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.item }}>
                                        <Text>{userItem.item.title}</Text>
                                    </View>
                                    <View style={{ ...styles.center, ...styles.sign }} />
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerField}>
                        <View>
                            <Text>Menyetujui</Text>
                        </View>
                        <View style={styles.footerProfile}>
                            <Text style={styles.footerProfileName}>Mohammad Samsul</Text>
                            <Text>VP O & M 1</Text>
                        </View>
                    </View>
                    <View style={styles.footerField}>
                        <View>
                            <Text>Diperintah</Text>
                        </View>
                        <View style={styles.footerProfile}>
                            <Text style={styles.footerProfileName}>Bramastra Wisnu Putra</Text>
                            <Text>AVP Mekanik P6</Text>
                        </View>
                    </View>
                    <View style={styles.footerField}>
                        <View>
                            <Text>Yang Menerima Tugas</Text>
                        </View>
                        <View style={styles.footerProfile}>
                            <Text style={styles.footerProfileName}>{userItems[0].user.name}</Text>
                            <Text>{userItems[0].user.npk}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Letter
