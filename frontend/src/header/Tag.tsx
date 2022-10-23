import './Searchbar.css'

const Tag = ({ data, bgColor }: { data: string, bgColor: string }) => {
    const color = {backgroundColor: bgColor, textShadow: '0px 0px 2px black'}
    return (
        <div style={color} className='tag'>
            {data}
        </div>
    )
}

export default Tag