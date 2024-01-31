import packageJson from '@/package.json'

const License = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    return (
        <footer className='flex flex-col justify-center text-[8px] text-white/30'>
            <div className='flex items-center gap-1'>
                <p>&copy;</p>
                <p>{currentYear}</p>
            </div>
            <div className='flex flex-col'>
                <a
                    href='https://github.com/mad4869/overtime-system/'
                    target='_blank'
                    title='Go to Github'
                    className='hover:underline'>
                    <p>{packageJson.name.split('_').join(' ').toUpperCase()}</p>
                </a>
                <p>versi {packageJson.version}</p>
            </div>
        </footer>
    )
}

export default License
