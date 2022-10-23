const Tag = ({ data, bgColor }: { data: string, bgColor: string }) => {
    const color = {backgroundColor: bgColor}
    return (
        <div style={color}>
            {data}
        </div>
    )
}

export default Tag