import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr } from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

type EmailProps = {
    url: string,
}

const Email = ({ url }: EmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Akses link berikut untuk mendapatkan password baru</Preview>
            <Tailwind>
                <Body>
                    <Container>
                        <Section>
                            <Heading>
                                Akses link berikut untuk mendapatkan password baru
                            </Heading>
                            <Text className='text-secondary'>{url}</Text>
                            <Hr />
                            <Text className='text-primary-500'>
                                Pesan ini adalah pesan otomatis. Jangan membalas ke alamat email ini. Hubungi admin untuk pertanyaan lebih lanjut.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default Email
