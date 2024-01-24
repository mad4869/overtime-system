import { Document, StyleSheet, Font } from '@react-pdf/renderer'
import { type PropsWithChildren } from 'react'

Font.register({
    family: 'Open Sans', src: 'http://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf', fontStyle: 'normal', fontWeight: 'normal'
})

const styles = StyleSheet.create({
    document: {
        fontFamily: 'Open Sans',
    }
})

const RecapLetterDocument = ({ children }: PropsWithChildren) => {
    return (
        <Document
            style={styles.document}
            title='Surat Perintah Lembur'
            author='PT. YUM'>
            {children}
        </Document>
    )
}

export default RecapLetterDocument
