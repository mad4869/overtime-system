import packageJson from '@/package.json'

const License = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    return (
        <section
            className="px-8 py-4 space-y-2 rounded-lg shadow-xl bg-white/50 shadow-white/50 text-primary">
            <div className='flex items-center justify-center gap-2 font-medium'>
                <p>&copy;</p>
                <p>{currentYear}</p>
                <p>-</p>
                <a
                    href='https://github.com/mad4869/overtime-system/'
                    target='_blank'
                    title='Go to Github'
                    className='hover:underline'>
                    <p>{packageJson.name.split('_').join(' ').toUpperCase()}</p>
                </a>
                <p>versi {packageJson.version}</p>
            </div>
            <p className='text-xs'>
                Built by&nbsp;
                <a
                    href='https://github.com/mad4869/'
                    target='_blank'
                    title='Go to Github'
                    className='hover:underline'>
                    MAkbarD
                </a>
            </p>
        </section>
    )
}

export default License
