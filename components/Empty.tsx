type EmptyProps = {
    message: string
}

const Empty = ({ message }: EmptyProps) => {
    return (
        <div className="flex items-center justify-center">
            <p className="bg-secondary text-white rounded-full px-4 py-1">
                {message}
            </p>
        </div>
    )
}

export default Empty
