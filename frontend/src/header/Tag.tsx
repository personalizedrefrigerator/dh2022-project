import './Searchbar.css'

const Tag = ({ data, bgColor }: { data: string, bgColor: string }) => {
    const color = {backgroundColor: bgColor}
    return (
        <div style={color} className='tag'>
            {data}
        </div>
    )
}

export default Tag